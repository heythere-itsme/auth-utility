#!/usr/bin/env node
import { Command } from 'commander';
import * as p from '@clack/prompts';
import color from 'picocolors';
import path from 'path';
import fs from 'fs/promises';
import { Project } from 'ts-morph';

const program = new Command();

const GITHUB_BASE = "https://github.com/heythere-itsme/auth-utility";
const BRANCH = "main";

// Added originalDir to calculate relative path differences accurately
const AUTH_REGISTRY = {
  google: {
    files: [
      {
        name: "Google Auth UI",
        path: `${GITHUB_BASE}/blob/${BRANCH}/packages/ui/src/components/GoogleAuthButton.tsx`,
        originalDir: "packages/ui/src/components",
        userTarget: "components/auth_util/ui/GoogleAuthButton.tsx"
      },
      {
        name: "Google Auth Strategy",
        path: `${GITHUB_BASE}/blob/${BRANCH}/packages/core/src/utils/googleStratergy.ts`,
        originalDir: "packages/core/src/utils",
        userTarget: "components/auth_util/logic/googleStratergy.ts"
      },
      {
        name: "Google Auth Controller",
        path: `${GITHUB_BASE}/blob/${BRANCH}/packages/core/src/controller/authController.ts`,
        originalDir: "packages/core/src/controller",
        userTarget: "components/auth_util/logic/authController.ts"
      }
    ]
  }
};

/**
 * Updates relative imports while preserving path aliases.
 */
async function updateRelativeImportsOnly(code: string, originalDir: string, targetDir: string) {
  const project = new Project();
  const sourceFile = project.createSourceFile("temp.ts", code);

  sourceFile.getImportDeclarations().forEach(declaration => {
    if (declaration.isModuleSpecifierRelative()) {
      const specifier = declaration.getModuleSpecifierValue();

      const absolutePath = path.resolve(originalDir, specifier);
      let newRelative = path.relative(targetDir, absolutePath).replace(/\\/g, '/');

      if (!newRelative.startsWith('.')) {
        newRelative = `./${newRelative}`;
      }

      declaration.setModuleSpecifier(newRelative);
    }
  });

  return sourceFile.getFullText();
}

program
  .name('authutil-cli')
  .description('Authentication utilities Package Testing')
  .version('1.1.0');

program
  .command('add')
  .description("To add the selected authentication")
  .action(async () => {
    p.intro(color.bgGreen(color.black(' Initialization... ')));

    const stratergySelection = await p.select({
      message: "Choose Auth method",
      options: [
        { value: 'google', label: 'Google Oauth' }
      ]
    });

    if (p.isCancel(stratergySelection)) {
      p.cancel('Aborted');
      process.exit(0);
    }

    // In a real scenario, you would dynamically ask for these paths.
    // Here we use the userTarget from the registry as the default assumption.
    const customComponentPath = await p.text({
      message: 'Where should we add the UI component?',
      placeholder: AUTH_REGISTRY.google.files[0].userTarget,
      defaultValue: AUTH_REGISTRY.google.files[0].userTarget,
    });

    if (p.isCancel(customComponentPath)) {
      p.cancel('Aborted at files path');
      process.exit(0);
    }

    const fetchGithubFile = async (githubUrl: string) => {
      const rawUrl = githubUrl
        .replace("github.com", "raw.githubusercontent.com")
        .replace("/blob/", "/");

      const res = await fetch(rawUrl);
      if (!res.ok) throw new Error(`Could not fetch ${path.basename(githubUrl)}`);
      return res.text();
    };

    const s = p.spinner();
    s.start('Downloading and transforming source files...');

    try {
      const selectedData = AUTH_REGISTRY[stratergySelection as 'google'];

      // Fetch all raw files in parallel
      const downloadedFiles = await Promise.all(
        selectedData.files.map(async (file) => {
          const rawCode = await fetchGithubFile(file.path);
          return { ...file, rawCode };
        })
      );

      // Transform imports and write to disk
      for (const file of downloadedFiles) {
        // Calculate the absolute target directory based on the current working directory
        const absoluteTargetFilePath = path.join(process.cwd(), file.userTarget);
        const targetDir = path.dirname(absoluteTargetFilePath);

        // Run the ts-morph AST transformation
        const transformedCode = await updateRelativeImportsOnly(
          file.rawCode,
          file.originalDir,
          path.dirname(file.userTarget) // Use the relative target dir for internal math
        );

        // Ensure the directory exists, then write the file
        await fs.mkdir(targetDir, { recursive: true });
        await fs.writeFile(absoluteTargetFilePath, transformedCode);
      }

      s.stop(color.green('Files successfully added and imports updated!'));
      p.outro(color.blue('Setup complete. Check your target directories.'));

    } catch (error: any) {
      s.stop(color.red('Installation failed'));
      p.note(error.message, 'Error Detail');
    }
  });

program.parse();
