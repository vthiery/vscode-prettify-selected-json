'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

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
        json = JSON.parse(ugly);
    } catch (e) {
        vscode.window.showInformationMessage(e.message);
        return;
    }
    // Stringify the result
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
