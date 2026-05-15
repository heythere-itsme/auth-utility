#!/usr/bin/env node
import { Command } from 'commander';
import * as p from '@clack/prompts';
import color from 'picocolors';

const program = new Command();

program
  .name('authutil-cli')
  .description('Authentication utilities Package Testing')
  .version('1.0.5');

program
  .command('init')
  .description('Select the authentication Method')
  .action(async () => {
    p.intro(color.bgCyan(color.black(' auth-util-init ')));

    const projectType = await p.select({
      message: 'Which method to select',
      options: [
        { value: 'google', label: 'Google Oauth' },
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
