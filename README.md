#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> disassemble hangul text to consonants and vowels


## Install

```sh
$ npm install --save hangul-disassemble
```


## Usage

```js
var Hangul = require('hangul-disassemble');

var hangul = Hangul.disassemble('한글');
// hangul[0] === {first: 'ㅎ', vowel: 'ㅏ', last: 'ㄴ'}
// hangul[1] === {first: 'ㄱ', vowel: 'ㅡ', last: 'ㄹ'}
```


## License

MIT © [Dongwon Lim](./LICENSE)

[npm-image]: https://badge.fury.io/js/hangul-disassemble.svg
[npm-url]: https://npmjs.org/package/hangul-disassemble
[travis-image]: https://travis-ci.org/idw111/hangul-disassemble.svg?branch=master
[travis-url]: https://travis-ci.org/idw111/hangul-disassemble
[daviddm-image]: https://david-dm.org/idw111/hangul-disassemble.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/idw111/hangul-disassemble
