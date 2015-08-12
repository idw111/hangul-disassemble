#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> disassemble hangul text to consonants and vowels


## Install

```sh
$ npm install --save hangul-disassemble
```


## Usage

```js
var Hangul = require('hangul-disassemble');
```

- 한글을 초성(first), 중성(vowel), 종성(last)으로 리턴
```js
Hangul.disassemble('와');
// [{first: 'ㅇ', vowel: 'ㅘ', last: ''}]
Hangul.disassemble('한글');
// [{first: 'ㅎ', vowel: 'ㅏ', last: 'ㄴ'}, {first: 'ㄱ', vowel: 'ㅡ', last: 'ㄹ'}]
```

- 한글이 아니거나 자음, 모음만 있는 글자는 null 리턴
```js
Hangul.disassemble('hi');
// [null, null]
Hangul.disassemble('ㅇㅋ');
// [null, null]
Hangul.disassemble('h 헐');
// [null, null, {first: 'ㅎ', vowel: 'ㅓ', last: 'ㄹ'}]
```

- flatten 옵션을 주면 하나의 배열로 리턴
```js
Hangul.disassemble('와', {flatten: true});
// ['ㅇ', 'ㅘ']
Hangul.disassemble('한글', {flatten: true});
// ['ㅎ', 'ㅏ', 'ㄴ', 'ㄱ', 'ㅡ', 'ㄹ'];
```

- flatten 옵션을 주면 자음, 모음만 있는 글자도 리턴
```js
Hangul.disassemble('hi', {flatten: true});
// [null, null]
Hangul.disassemble('ㅇㅋ', {flatten: true});
// ['ㅇ', 'ㅋ'];
Hangul.disassemble('h 헐', {flatten: true});
// [null, null, 'ㅎ', 'ㅓ', 'ㄹ'];
```

- equals 함수로 두 개의 어구가 같은지 비교
```js
Hangul.equals('구성된다', '구성되ㄴ다');
// true
Hangul.equals('구성된다', '구성되다');
// false
```


## License

MIT © [Dongwon Lim](./LICENSE)

[npm-image]: https://badge.fury.io/js/hangul-disassemble.svg
[npm-url]: https://npmjs.org/package/hangul-disassemble
[travis-image]: https://travis-ci.org/idw111/hangul-disassemble.svg?branch=master
[travis-url]: https://travis-ci.org/idw111/hangul-disassemble
[daviddm-image]: https://david-dm.org/idw111/hangul-disassemble.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/idw111/hangul-disassemble
