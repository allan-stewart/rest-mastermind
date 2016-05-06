'use strict';

class SecretGenerator {
  generateWithLength(length) {
    var digits = [];
    while (length --> 0) {
      digits.push(Math.floor(Math.random() * 10))
    }
    return digits.join('');
  }
}

module.exports = SecretGenerator;
