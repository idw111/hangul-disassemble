'use strict';
var expect = require('expect.js');
var Hangul = require('../index');

describe('한글 텍스트 분리', function () {

    it('한글자를 정확하게 분리해야 한다', function () {
        var disassembled = Hangul.disassemble('강');
        expect(disassembled.length).to.be(1);
        expect(disassembled[0].first).to.be('ㄱ');
        expect(disassembled[0].vowel).to.be('ㅏ');
        expect(disassembled[0].last).to.be('ㅇ');
    });

    it('빈문자열이나 문자열이 아닌 경우 null을 리턴해야 한다', function () {
        expect(Hangul.disassemble('')).to.be(null);
        expect(Hangul.disassemble(new Date())).to.be(null);
        expect(Hangul.disassemble({test: '한글'})).to.be(null);
        expect(Hangul.disassemble(['한글'])).to.be(null);
    });

    it('한글이 아닌 경우 null을 리턴해야 한다', function () {
        var disassembled = Hangul.disassemble('abc 한글');
        expect(disassembled[0]).to.be(null);
        expect(disassembled[1]).to.be(null);
        expect(disassembled[3]).to.be(null);
        expect(disassembled[4]).to.be.an('object');
    });

    it('여러글자를 정확하게 분리해야 한다', function () {
        var disassembled = Hangul.disassemble('우와 신난다');
        expect(disassembled.length).to.be(6);
        expect(disassembled[1].first).to.be('ㅇ');
        expect(disassembled[1].vowel).to.be('ㅘ');
        expect(disassembled[1].last).to.be('');
        expect(disassembled[2]).to.be(null);
    });

    it('자음이나 모음만 있는 경우 null을 리턴해야 한다', function() {
        var disassembled = Hangul.disassemble('ㅇㅋ');
        expect(disassembled.length).to.be(2);
        expect(disassembled[0]).to.be(null);
        expect(disassembled[1]).to.be(null);
    });

    it('flatten 옵션을 준 경우, 한 글자를 정확히 분리해야 한다', function() {
        var disassembled = Hangul.disassemble('한', {flatten: true});
        expect(disassembled.length).to.be(3);
        expect(disassembled[0]).to.be('ㅎ');
        expect(disassembled[1]).to.be('ㅏ');
        expect(disassembled[2]).to.be('ㄴ');
    });

    it('flatten 옵션을 준 경우, 여러 글자를 정확히 분리해야 한다', function() {
        var disassembled = Hangul.disassemble('한글', {flatten: true});
        expect(disassembled.length).to.be(6);
        expect(disassembled[0]).to.be('ㅎ');
        expect(disassembled[1]).to.be('ㅏ');
        expect(disassembled[2]).to.be('ㄴ');
        expect(disassembled[3]).to.be('ㄱ');
        expect(disassembled[4]).to.be('ㅡ');
        expect(disassembled[5]).to.be('ㄹ');
    });

    it('flatten 옵션을 준 경우, 자음이나 모음만 있어도 결과를 리턴해야 한다', function() {
        var disassembled = Hangul.disassemble('ㅇㅋㅠㅠ', {flatten: true});
        expect(disassembled.length).to.be(4);
        expect(disassembled[0]).to.be('ㅇ');
        expect(disassembled[1]).to.be('ㅋ');
        expect(disassembled[2]).to.be('ㅠ');
        expect(disassembled[3]).to.be('ㅠ');
    });

    it('flatten 옵션을 준 경우, 한글이 아닌 글자는 null을 리턴해야 한다', function() {
        var disassembled = Hangul.disassemble('h 헐', {flatten: true});
        expect(disassembled.length).to.be(5);
        expect(disassembled[0]).to.be(null);
        expect(disassembled[1]).to.be(null);
        expect(disassembled[2]).to.be('ㅎ');
        expect(disassembled[3]).to.be('ㅓ');
        expect(disassembled[4]).to.be('ㄹ');
    });

    it('두개의 어구가 같은지 비교할 수 있다', function() {
        var shouldEqual = Hangul.equals('구성된다', '구성되ㄴ다');
        expect(shouldEqual).to.be(true);
        var shouldNotEqual = !Hangul.equals('구성된다', '구성되다');
        expect(shouldNotEqual).to.be(true);
    });

});
