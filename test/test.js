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

});
