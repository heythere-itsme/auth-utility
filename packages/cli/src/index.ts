import { Command } from 'commander';
import * as p from '@clack/prompts';
import color from 'picocolors';
import path from 'path';

const program = new Command();

const GITHUB_PATH = "https://github.com/heythere-itsme/auth-utility/tree/main";
const AUTH_REGISTRY = {
  google: {
    files: [
      {
      name: "Google Auth UI",
      path: `${GITHUB_PATH}/packages/ui/src/components/GoogleAuthButton.tsx`,
      userTarget: "components/auth_util/ui/GoogleAuthButton.tsx"
      },
      {
        name: "Google Auth Logic",
        path: `${GITHUB_PATH}/packages/core/src/utils/googleStratergy.ts`,
        userTarget: "components/auth_util/logic/googleStratergy.ts"
      },
      {
        name: "Google Auth Logic",
        path: `${GITHUB_PATH}/packages/core/src/controller/authController.ts`,
        userTarget: "components/auth_util/logic/authController.ts"
      }
    ]
  }
}

// Initial Comments to diplay
program
  .name('authutil-cli')
  .description('Authentication utilities Package Testing')
  .version('1.1.0');

// Option for user to choose the Auth Method
program
  .command('add')
  .description("To add the selected authentication")
  .action(async () => {
    p.intro(color.bgGreen(color.black('Initialization...')));

    const stratergySelection = await p.select({
      message: "Choose Auth method",
      options: [
        { value: 'google', label: 'Google Oauth' }
      ]
    });

    if (p.isCancel(stratergySelection)) {
      p.cancel('Aborted');
      return;
    }
// Fetching the File from github
    const fetchGithubFile = async (githubUrl: string) => {
          const rawUrl = githubUrl
            .replace("github.com", "raw.githubusercontent.com")
            .replace("/blob/", "/");

          const res = await fetch(rawUrl);
          if (!res.ok) throw new Error(`Could not fetch ${path.basename(githubUrl)}`);
          return res.text();
        };

    // Fetching starts Here
    const s = p.spinner();
    s.start('Fetching Files...');

// Try and Catch code
    try {
      const selectedData = AUTH_REGISTRY[stratergySelection as 'google'];
      const [componentCode, strategyCode, controllerCode] = await Promise.all(
              selectedData.files.map(file => fetchGithubFile(file.path))
            );
      const filesToWrite = [
              { dest: selectedData.files[0].userTarget, code: componentCode },
              { dest: selectedData.files[1].userTarget, code: strategyCode },
              { dest: selectedData.files[2].userTarget, code: controllerCode }
            ];
      for (const file of filesToWrite) {
              const fullPath = path.join(process.cwd(), file.dest);
              await fs.mkdir(path.dirname(fullPath), { recursive: true });
              await fs.writeFile(fullPath, file.code);
      }
      s.stop(color.green('Files successfully added to your project!'));
      p.outro(color.blue('Setup Completed!'))
    } catch (error: any) {
      s.stop(color.red('Installation failed'));
      p.note(error.message, 'Error Detail');
    }

  })

program.parse();
