#!/usr/bin/env node
import { Command } from 'commander';
import * as p from '@clack/prompts';
import color from 'picocolors';

const program = new Command();

program
  .name('auth-util')
  .description('A shadcn-style CLI for authentication utilities')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize the auth utility in your project')
  .action(async () => {
    p.intro(color.bgCyan(color.black(' auth-util-init ')));

    const projectType = await p.select({
      message: 'Which framework are you using?',
      options: [
        { value: 'next', label: 'Next.js' },
        { value: 'express', label: 'Express (Backend only)' },
      ],
    });

    p.note('This will create an auth-util.json config file.');

    const confirm = await p.confirm({
      message: 'Proceed with initialization?',
    });

    if (confirm) {
      p.outro(color.green('Initialization complete!'));
    } else {
      p.cancel('Operation cancelled.');
    }
  });

program.parse();
