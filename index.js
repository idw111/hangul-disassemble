var Hangul = {

	alphabets: [
		['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
		['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'],
		['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
	],

	disassemble: function(text) {
		if (typeof text !== 'string') return null;
		if (text.length === 0) return null;
		if (text.length === 1) return [Hangul._disassembleSingleCharacter(text)];
		return Hangul._disassembleMultipleCharacters(text);
	},

	_disassembleSingleCharacter: function(singleCharacter) {
		var code = singleCharacter.charCodeAt(0);
		if (code === 32) return null;
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
		return result;
	},

	_disassembleMultipleCharacters: function(multipleCharacters) {
		var result = [];
		for (var i = 0; i < multipleCharacters.length; i++) {
			result.push(Hangul._disassembleSingleCharacter(multipleCharacters.charAt(i)));
		}
		return result;
	}

};

module.exports = Hangul;
