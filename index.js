var equals = require('array-equal');

var Hangul = {

	alphabets: [
		['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
		['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'],
		['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
	],

	disassemble: function(text, options) {
		options = options || {};
		var flatten = options.flatten || false;
		if (typeof text !== 'string') return null;
		if (text.length === 0) return null;
		return Hangul._disassembleMultipleCharacters(text, flatten);
	},

	equals: function(a, b) {
		if (a === b) return true;
		return equals(Hangul.disassemble(a, {flatten: true}), Hangul.disassemble(b, {flatten: true}));
	},

	isVowel: function(character) {
		if (!character) return false;
		for (var i in Hangul.alphabets[1]) {
			if (character === Hangul.alphabets[1][i]) return true;
		}
		return false;
	},

	isConsonant: function(character) {
		if (!character) return false;
		for (var i in Hangul.alphabets[0]) {
			if (character === Hangul.alphabets[0][i]) return true;
		}
		for (var i in Hangul.alphabets[2]) {
			if (character === Hangul.alphabets[2][i]) return true;
		}
		return false;

	},

	_disassembleSingleCharacter: function(singleCharacter, flatten) {
		var code = singleCharacter.charCodeAt(0);
		if (code === 32) return null;
		if (flatten) {
			if (Hangul.isConsonant(singleCharacter) || Hangul.isVowel(singleCharacter)) return [singleCharacter];
		}
		if (code < 0xAC00 || code > 0xD7A3) return null;
		code = code - 0xAC00;

		var last = code % 28;
		var vowel = ((code - last) / 28) % 21;
		var first = (((code - last) / 28) - vowel) / 21;
		var result = {
			first: Hangul.alphabets[0][first],
			vowel: Hangul.alphabets[1][vowel],
			last: Hangul.alphabets[2][last]
		};

		if (!flatten) return result;

		var flat = [];
		if (result.first) flat.push(result.first);
		if (result.vowel) flat.push(result.vowel);
		if (result.last) flat.push(result.last);

		return flat;
	},

	_disassembleMultipleCharacters: function(multipleCharacters, flatten) {
		var result = [];
		for (var i = 0; i < multipleCharacters.length; i++) {
			var disassembled = Hangul._disassembleSingleCharacter(multipleCharacters.charAt(i), flatten);
			if (flatten) result = result.concat(disassembled)
			else result.push(disassembled);
		}
		return result;
	}

};

module.exports = Hangul;
