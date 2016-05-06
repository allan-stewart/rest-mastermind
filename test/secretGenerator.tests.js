'use strict';

let SecretGenerator = require('../src/secretGenerator.js');
let assert = require('assert');

describe('SecretGenerator', () => {
  let subject = new SecretGenerator();

  describe('generateWithLength', () => {
    it('should return a secret of the appropriate length', () => {
      var result = subject.generateWithLength(6);
      assert.equal(result.length, 6);
    });

    it('should return a numeric secret', () => {
      var result = subject.generateWithLength(6);
      var pattern = /^\d{6}$/;
      assert(pattern.test(result), `Invalid secret: ${result}`);
    });
  });
});
