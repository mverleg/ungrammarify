
'use strict';

(function () {
    // require("ace/commands/default_commands").commands.push({
    //     name: "Toggle Fullscreen",
    //     bindKey: "F11",
    //     exec: function(editor) {
    //         dom.toggleCssClass(document.body, "fullScreen");
    //         dom.toggleCssClass(editor.container, "fullScreen");
    //         editor.resize();
    //     }
    // });

    let editor = ace.edit("editor", {
        mode: "ace/mode/javascript",
        selectionStyle: "text"
    });

    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
    });
    editor.session.setUseWrapMode(true);
    editor.setHighlightActiveLine(false);

    editor.setTheme("ace/theme/twilight");
})();

