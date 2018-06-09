package nl.markv.ungrammarify

class Article(text: String): Text {

    val article: List<Line>;

    init {
        article = Regex("[.,;?!]\\s+").split(text)
                .map{ Regex("[^a-zA-Z0-9'\\s]").replace(it, "") }
                .filter{ it.length > 0 }
                .map{ Line(it) }
    }

    override fun text(): CharSequence {
        return article.map{ it.text() }.joinToString("\n")
    }
}
