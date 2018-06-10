package nl.markv.ungrammarify

class Word(text: String): Text {

    val word: String;

    init {
        var tx = text
        if (tx == "an") {
            tx = "a"
        }
        if (tx.endsWith("ied")) {
            tx = text.removeSuffix("ied") + "y"
        }
        if (!tx.endsWith("is") && !tx.endsWith("os") && !tx.endsWith("us")) {
            tx = tx.removeSuffix("s")
        }
        if (tx.length > 5) {
            tx = tx.removeSuffix("ing")
        }
        word = tx;
    }

    override fun text(): CharSequence {
        return word
    }
}