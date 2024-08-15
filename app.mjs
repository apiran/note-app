import validator from 'validator';
import chalk from 'chalk';
import * as notes from "./notes.mjs";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Create commands
yargs(hideBin(process.argv))
  .command('add', 'add a new note', {    
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string'
    }    
  }, (argv) => {
    notes.addNote(argv.title, argv.body);
  })
  .command('remove', 'Remove a note', {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    }
  }, (argv) => {
    notes.removeNote(argv.title);
  })
  .command('list', 'list your notes', () => {
    notes.listNotes();
  })
  .command('read', 'read a note', {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    }
  }, (argv) => {
    notes.readNote(argv.title);
  })
  .demandCommand(1, 'You need to specify a valid command before moving on')
  .help() // Adds a help menu
  .alias('help', 'h')
  .parse();
