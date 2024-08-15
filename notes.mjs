import fs from 'node:fs';
import chalk from 'chalk';

export const getNotes = () => {
    return 'Your notes ...';
};

export const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({ title, body });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
};

export const removeNote = (title) => {
    const notes = loadNotes();  
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse(`Note titled "${title}" has been removed.`));
    } else {
        console.log(chalk.red.inverse(`No note found with the title "${title}"`));
    }
};

export const listNotes = () => {
    console.log(chalk.inverse('Your notes:'));
    const notes = loadNotes();

    notes.forEach(note => {
        console.log(note.title);
    });
};

export const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    try {
        const dataJSON = JSON.stringify(notes, null, 2);  // Adds indentation for readability
        fs.writeFileSync('notes.json', dataJSON);
    } catch (e) {
        console.error(chalk.red('Error saving notes:', e.message));
    }
};
