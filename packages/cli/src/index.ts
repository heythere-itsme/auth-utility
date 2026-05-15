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

program
  .name('authutil-cli')
  .description('Authentication utilities Package Testing')
  .version('1.1.0');

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

    const customComponentPath = await p.text({
      message: 'Where should add this component',
      placeholder: 'components/auth_util/ui/GoogleAuthButton.tsx"',
      defaultValue: 'components/auth_util/ui/GoogleAuthButton.tsx"',
    })

    const customStratergyPath = await p.text({
      message: 'Where to add this logic',
      placeholder: 'components/auth_util/logic/googleStratergy.ts',
      defaultValue: 'components/auth_util/logic/googleStratergy.ts'
    })
    const customControllerPath = await p.text({
      message: 'Where to add this logic',
      placeholder: 'components/auth_util/logic/authController.ts',
        defaultValue: 'components/auth_util/logic/authController.ts'
    })

    if (p.isCancel(customStratergyPath) && p.isCancel(customComponentPath) && p.isCancel(customControllerPath)) {
      p.cancel('Aborted at files path');
      return;
    }

    const s = p.spinner()
    s.start('Connecting to services, downloading assets ...');

    try {
      const selectedData = AUTH_REGISTRY[stratergySelection as 'google'];
      const componentDest = path.join(process.cwd(), customComponentPath as string);
      const stratergyDest = path.join(process.cwd(), customStratergyPath as string);
      const controllerDest = path.join(process.cwd(), customControllerPath as string)

      const componentRes = await fetch(selectedData.files[0].path);
      const stratergyRes = await fetch(selectedData.files[1].path);
      const controllerRes = await fetch(selectedData.files[2].path);

      if (!componentRes.ok || !stratergyRes.ok || !controllerRes.ok) {
        throw new Error('Failed to retrieve files');
      }

      let componentCode = await componentRes.text();
      let stratergyCode = await stratergyRes.text();
      let controllerCoed = await controllerRes.text();


    } catch (error) {

    }

  })

program.parse();
