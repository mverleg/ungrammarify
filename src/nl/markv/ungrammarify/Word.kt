package nl.markv.ungrammarify

class Word(text: String): Text {

    val word: String;

    init {
        word = text
                .toLowerCase()
                .removeSuffix("ing")
                .removeSuffix("ed")
                .removeSuffix("s")
    }

    override fun text(): CharSequence {
        return word
    }
}
