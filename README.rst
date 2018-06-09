
Ungrammarify
===============================

This package attempts to remove grammar from an English text, to see whether the text is understandable from the words alone.

What that really means is probably up for debate, but what it effectively does is changing the word order, removing conjugations and plurals, and stripping most interpunction and caps.

I figured out during this project that I don't really know what grammar is. But it was fun anyway.

Todo
-------------------------------

This is probably an incomplete list:

* Remove perfect tenses?
* Irregular verbs
* Reduce distinction between verbs and nouns somehow?
* Conjunctions?

Installation
-------------------------------

Clone the project and move to the top directory, then:

* `npm install kotlin kotlin-test`
* `gradle wrapper`
* `./gradlew build`
* `cp node_modules/kotlin/kotlin*.js node_modules/kotlin-test/kotlin-test*.js build/js/`
* `node build/js/nl.markv.ungrammarify.js`
