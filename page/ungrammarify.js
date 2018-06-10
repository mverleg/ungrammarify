define(['exports', 'kotlin'], function (_, Kotlin) {
  'use strict';
  var joinToString = Kotlin.kotlin.collections.joinToString_fmv235$;
  var Regex_init = Kotlin.kotlin.text.Regex_init_61zpoe$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var decapitalize = Kotlin.kotlin.text.decapitalize_pdl1vz$;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var unboxChar = Kotlin.unboxChar;
  var toShort = Kotlin.toShort;
  var throwCCE = Kotlin.throwCCE;
  var sum = Kotlin.kotlin.collections.sum_plj8ka$;
  var equals = Kotlin.equals;
  var endsWith = Kotlin.kotlin.text.endsWith_7epoxm$;
  var removeSuffix = Kotlin.kotlin.text.removeSuffix_gsj5wt$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function Article(text) {
    this.article = null;
    var $receiver = Regex_init('[.,;?!]\\s+').split_905azu$(text);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(Regex_init("[^a-zA-Z0-9'\\s]").replace_x2uqeu$(item, ''));
    }
    var destination_0 = ArrayList_init();
    var tmp$_0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      if (element.length > 0)
        destination_0.add_11rb$(element);
    }
    var destination_1 = ArrayList_init(collectionSizeOrDefault(destination_0, 10));
    var tmp$_1;
    tmp$_1 = destination_0.iterator();
    while (tmp$_1.hasNext()) {
      var item_0 = tmp$_1.next();
      destination_1.add_11rb$(new Line(item_0));
    }
    this.article = destination_1;
  }
  Article.prototype.text = function () {
    var $receiver = this.article;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.text());
    }
    return joinToString(destination, '\n');
  };
  Article.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Article',
    interfaces: [Text]
  };
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  var sortedWith = Kotlin.kotlin.collections.sortedWith_iwcb0m$;
  var wrapFunction = Kotlin.wrapFunction;
  var compareBy$lambda = wrapFunction(function () {
    var compareValues = Kotlin.kotlin.comparisons.compareValues_s00gnj$;
    return function (closure$selector) {
      return function (a, b) {
        var selector = closure$selector;
        return compareValues(selector(a), selector(b));
      };
    };
  });
  var Comparator = Kotlin.kotlin.Comparator;
  function Comparator$ObjectLiteral(closure$comparison) {
    this.closure$comparison = closure$comparison;
  }
  Comparator$ObjectLiteral.prototype.compare = function (a, b) {
    return this.closure$comparison(a, b);
  };
  Comparator$ObjectLiteral.$metadata$ = {kind: Kind_CLASS, interfaces: [Comparator]};
  function Line(text) {
    this.line = null;
    var $receiver = Regex_init('\\s+').split_905azu$(decapitalize(text));
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(new Word(item));
    }
    this.line = sortedWith(copyToArray(destination), new Comparator$ObjectLiteral(compareBy$lambda(Line_init$lambda)));
  }
  Line.prototype.text = function () {
    var $receiver = this.line;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.text());
    }
    return joinToString(destination, ' ') + '.';
  };
  function Line_init$lambda(it) {
    return it.hash();
  }
  Line.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Line',
    interfaces: [Text]
  };
  function Text() {
  }
  Text.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Text',
    interfaces: []
  };
  function Word(text) {
    this.word = null;
    var tx = text;
    if (equals(tx, 'an')) {
      tx = 'a';
    }
    if (endsWith(tx, 'ied')) {
      tx = removeSuffix(text, 'ied') + 'y';
    }
    if (!endsWith(tx, 'is') && !endsWith(tx, 'os') && !endsWith(tx, 'us')) {
      tx = removeSuffix(tx, 's');
    }
    if (tx.length > 5) {
      tx = removeSuffix(tx, 'ing');
    }
    if (equals(tx, 'i')) {
      tx = 'I';
    }
    this.word = tx;
  }
  Word.prototype.text = function () {
    return this.word;
  };
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  var toBoxedChar = Kotlin.toBoxedChar;
  Word.prototype.hash = function () {
    var $receiver = this.word;
    var destination = ArrayList_init($receiver.length);
    var tmp$;
    tmp$ = iterator($receiver);
    while (tmp$.hasNext()) {
      var item = unboxChar(tmp$.next());
      destination.add_11rb$(toShort(unboxChar(toBoxedChar(item)) | 0));
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_0, tmp$_0_0;
    var index = 0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item_0 = tmp$_0.next();
      var tmp$_1;
      destination_0.add_11rb$(((tmp$_0_0 = index, index = tmp$_0_0 + 1 | 0, tmp$_0_0) + 1 | 0) * item_0 % (typeof (tmp$_1 = 137) === 'number' ? tmp$_1 : throwCCE()));
    }
    return sum(destination_0);
  };
  Word.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Word',
    interfaces: [Text]
  };
  function do_ungrammarify(text) {
    return (new Article(text)).text().toString();
  }
  var package$nl = _.nl || (_.nl = {});
  var package$markv = package$nl.markv || (package$nl.markv = {});
  var package$ungrammarify = package$markv.ungrammarify || (package$markv.ungrammarify = {});
  package$ungrammarify.Article = Article;
  package$ungrammarify.Line = Line;
  package$ungrammarify.Text = Text;
  package$ungrammarify.Word = Word;
  package$ungrammarify.do_ungrammarify = do_ungrammarify;
  Kotlin.defineModule('ungrammarify', _);
  return _;
});

//# sourceMappingURL=ungrammarify.js.map
