package nl.markv.ungrammarify

@JsName("do_ungrammarify")
public fun do_ungrammarify(text: String): String {
    return Article(text).text().toString()
}
