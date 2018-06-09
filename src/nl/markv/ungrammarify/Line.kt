package nl.markv.ungrammarify

class Line(text: String): Text {

    val line: List<Word>;

    init {
        line = Regex("[.,;] *")
                .split(text)
                .map{ Word(it) }
                .toTypedArray()
                .sortedBy{ it.hashCode() }
    }

    override fun text(): CharSequence {
        return line.map{ it.text() }.joinToString(" ") + "."
    }
}
