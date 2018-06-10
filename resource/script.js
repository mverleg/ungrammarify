
'use strict';

(function () {

    let editor = null, output = null;

    function show_user_warning(msg) {
        console.error(msg);
        let popup = document.createElement('p');
        popup.classList.add('user_warning_popup');
        popup.appendChild(document.createTextNode(msg));
        document.body.appendChild(popup);
        setTimeout(function() {
            document.body.removeChild(popup);
        }, 4000);
    }

    function ungrammarify_action() {
        if (editor === null || output === null) {
            show_user_warning("Cannot ungrammarify now, the editor has not been loaded (yet).");
            return;
        }
        output.setValue(editor.getValue());
    }

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

        /* Process the initial text */
        ungrammarify_action();
    });

    document.getElementById("ungrammarify_btn").addEventListener("click", function(e) {
        // This needs the Ace editors to have been initialized.
        ungrammarify_action();
    }, false);

})();

