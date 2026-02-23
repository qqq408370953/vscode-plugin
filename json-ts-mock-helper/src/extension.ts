import * as vscode from 'vscode';
import { convertJsonToTs } from './jsonToTs';
import { generateMockFromTs } from './tsToMock';

export function activate(context: vscode.ExtensionContext) {
  // Register command: JSON to TypeScript
  const convertJsonToTsCommand = vscode.commands.registerCommand(
    'json-ts-mock-helper.convertJsonToTs',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);

      if (!selectedText || selectedText.trim() === '') {
        vscode.window.showErrorMessage('Please select JSON text first');
        return;
      }

      try {
        const tsCode = await convertJsonToTs(selectedText);
        if (tsCode) {
          await editor.edit(editBuilder => {
            editBuilder.insert(selection.end, '\n\n' + tsCode);
          });
          vscode.window.showInformationMessage('TypeScript interface generated successfully!');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        vscode.window.showErrorMessage(`Failed to convert JSON: ${errorMessage}`);
      }
    }
  );

  // Register command: TypeScript to Mock
  const generateMockFromTsCommand = vscode.commands.registerCommand(
    'json-ts-mock-helper.generateMockFromTs',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);

      if (!selectedText || selectedText.trim() === '') {
        vscode.window.showErrorMessage('Please select TypeScript interface first');
        return;
      }

      try {
        const mockCode = await generateMockFromTs(selectedText);
        if (mockCode) {
          await editor.edit(editBuilder => {
            editBuilder.insert(selection.end, '\n\n' + mockCode);
          });
          vscode.window.showInformationMessage('Mock data generated successfully!');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        vscode.window.showErrorMessage(`Failed to generate mock: ${errorMessage}`);
      }
    }
  );

  context.subscriptions.push(convertJsonToTsCommand);
  context.subscriptions.push(generateMockFromTsCommand);
}

export function deactivate() {}
