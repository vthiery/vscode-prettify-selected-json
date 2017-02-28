'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Use jsonlint to prettify the json
const jsonlint = require('jsonlint');
// Use the tabSize defined in user settings
const INDENT_SPACE = vscode.window.activeTextEditor.options.tabSize;

// Prettify function
function prettify(textEditor, startLine, endLine) {
    var range = new vscode.Range(startLine, endLine);
    // Return if empty
    if (range.isEmpty) {
        return;
    }
    // Get text from range
    var ugly = textEditor.document.getText(range);

    // Prettify the selection
    let json = null;
    try {
        json = jsonlint.parse(ugly);
    } catch (jsonLintError) {
        const message: string = jsonLintError.message;
        const lineNumber = parseInt(message.substring(message.indexOf('line ') + 5, message.indexOf(':')), 10);
        return;
    }
    // Stringify the result of jsonlint
    let pretty = JSON.stringify(json, null, INDENT_SPACE);

    textEditor.edit(builder => {
        builder.replace(range, pretty);
    });
}

// Prettify the active selection following the input method
function prettifyActive() {
    var textEditor = vscode.window.activeTextEditor;
    var selection = textEditor.selection;
    // Apply sort on our selection with a given method
    prettify(textEditor, selection.start, selection.end);
}

// Prettify
exports.prettify = prettifyActive;
