
'use strict';

requirejs.config({
    baseUrl: "./",
    paths: {
        ace: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace',
        kotlin: 'page/kotlin',
        ungrammarify: 'page/ungrammarify',
    }
});

let editor = null;
let output = null;
let ungrammarify = null;

requirejs(["ungrammarify"], function (ungrammarify) {
    if (!ungrammarify) {
        show_user_warning("Ungrammarify logic failed to load.");
        return;
    }
    ungrammarify = ungrammarify.nl.markv.ungrammarify.ungrammarify;
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
    }, 4000);
}

/* Read the text from input, ungrammarify it and add it to the output. */
function ungrammarify_action() {
    if (editor === null || output === null) {
        show_user_warning("Cannot ungrammarify now, the editor has not been loaded (yet).");
        return;
    }
    if (ungrammarify === null) {
        show_user_warning("Cannot ungrammarify now, the ungrammarifying logic has not been loaded (yet).");
        return;
    }
    output.setValue(ungrammarify(editor.getValue()));
}

requirejs(["ace"], function (ace) {
    if (!ace) {
        show_user_warning("Ace editor failed to load.");
        return;
    }

    /* Input */
    editor = ace.edit("editor", {
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
    output = ace.edit("output", {
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

/* Add button logic. */
document.getElementById("ungrammarify_btn").addEventListener("click", function(e) {
    // This needs the Ace editors to have been initialized.
    ungrammarify_action();
}, false);
