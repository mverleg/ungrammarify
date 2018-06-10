
'use strict';

(function () {

    var editor, output;

    require(["ace/ace"], function (ace) {
        /* Input */
        editor = window.ace.edit("editor", {
            mode: "ace/mode/text",
            selectionStyle: "text"
        });

        editor.setOptions({
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
            highlightActiveLine: true,
            showPrintMargin: false,
            theme: "ace/theme/twilight"
        });
        editor.session.setUseWrapMode(true);

        /* Output */
        output = window.ace.edit("output", {
            mode: "ace/mode/text",
            selectionStyle: "text"
        });

        output.setOptions({
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
            highlightActiveLine: true,
            showPrintMargin: false,
            theme: "ace/theme/twilight"
        });
        output.session.setUseWrapMode(true);
        output.setReadOnly(true);
    });

    document.getElementById("ungrammarify_btn").addEventListener("click", function(e) {
        output.setValue(editor.getValue());
        // console.warn("clicked", editor.getValue(), output);
    }, false);

})();

