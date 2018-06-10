
'use strict';

requirejs.config({
    baseUrl: "./",
    paths: {
        ace: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3',
        // twilight: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/theme-twilight',
        kotlin: 'page/kotlin',
        ungrammarify: 'page/ungrammarify',
    }
});

/* Show a warning popup to the user if something goes wrong. */
function show_user_warning(msg) {
    console.error(msg);
    let popup = document.createElement('p');
    popup.classList.add('user_warning_popup');
    popup.appendChild(document.createTextNode(msg));
    document.body.appendChild(popup);
    setTimeout(function() {
        document.body.removeChild(popup);
    }, 3000);
}

let editor = null;
let output = null;
let do_ungrammarify = null;

/* Read the text from input, ungrammarify it and add it to the output. */
function ungrammarify_action() {
    if (editor === null || output === null) {
        show_user_warning("Cannot ungrammarify now, the editor has not been loaded (yet).");
        return;
    }
    if (do_ungrammarify === null) {
        show_user_warning("Cannot ungrammarify now, the ungrammarifying logic has not been loaded (yet).");
        return;
    }
    output.setValue(do_ungrammarify(editor.getValue()));
}

requirejs(["ace/ace", "ungrammarify"], function (ace, ungrammarify) {
    if (!ace) {
        show_user_warning("Ace editor failed to load.");
        return;
    }

    if (!ungrammarify || !ungrammarify.nl.markv.ungrammarify.do_ungrammarify) {
        show_user_warning("Ungrammarify logic failed to load.");
        return;
    }

    /* Bind the ungrammarify function. */
    do_ungrammarify = ungrammarify.nl.markv.ungrammarify.do_ungrammarify;

    /* Input */
    editor = ace.edit("editor", {
        mode: "ace/mode/text",
        theme: "ace/theme/twilight",
        selectionStyle: "text",
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        highlightActiveLine: true,
        showPrintMargin: false
    });
    editor.session.setUseWrapMode(true);

    /* Output */
    output = ace.edit("output", {
        mode: "ace/mode/text",
        theme: "ace/theme/twilight",
        selectionStyle: "text",
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        highlightActiveLine: true,
        showPrintMargin: false
    });
    output.session.setUseWrapMode(true);
    output.setReadOnly(true);

    /* Process the initial text */
    ungrammarify_action();
});

/* Add button logic. */
document.getElementById("ungrammarify_btn").addEventListener("click", function(e) {
    // This needs the Ace editors and Kotlin to have been initialized.
    ungrammarify_action();
}, false);
