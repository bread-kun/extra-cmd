"use strict";

import {
  commands,
  ExtensionContext,
  TextEditor,
  TextEditorEdit,
} from "vscode";

import { deduplicator } from "./deduplicate";
import { Transposer } from "./transpose";

export function activate(context: ExtensionContext) {
  // register deduplicate command
  context.subscriptions.push(commands.registerTextEditorCommand(
    "extension.extra-cmd.deduplicate",
    (textEditor: TextEditor, edit: TextEditorEdit) => {
      deduplicator(textEditor, edit).deduplicate();
    }
  ));

  // register transpose command
  context.subscriptions.push(commands.registerTextEditorCommand(
    "extension.extra-cmd.transpose",
    (textEditor: TextEditor, edit: TextEditorEdit) => {
      const transposer = new Transposer(textEditor, edit);
      transposer.transpose();
    }
  ))
}