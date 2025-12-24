"use strict";

import {
  commands,
  ExtensionContext,
  Position,
  Selection,
  TextEditor,
  TextEditorEdit,
  window,
} from "vscode";

export function deduplicator (editor: TextEditor, editorEdit: TextEditorEdit) {
  return {
    deduplicate() {
      const selections = editor.selections;
      const contentfullTextSelected = selections.filter(s => !s.isEmpty);

      if (contentfullTextSelected && contentfullTextSelected.length == 1) {
        // nothing to deduplicate
        return;
      }

      // Swap the characters to the left and right of the cursor
      // if (!contentfullTextSelected) {
      //   this.transposeCharacters(selections);
      //   return;
      // }

      const textsSet = new Set();
      const newSelections: Selection[] = []
      contentfullTextSelected.forEach((s) => {
        const text = editor.document.getText(s);
        if (textsSet.has(text)) {
          editorEdit.replace(s, '');
        } else {
          textsSet.add(text);
          newSelections.push(s);
        }
      });
      textsSet.clear();
      editor.selections = newSelections
    }
  }
}