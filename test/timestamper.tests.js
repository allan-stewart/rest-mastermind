'use strict';

let timestamper = require('../src/timestamper.js');
let assert = require('assert');

describe('timestamper', () => {
  it('should return a timestamp value', () => {
    var result = timestamper();
    var expected = new Date().getTime();
    assert.equal((expected - result) < 10, true);
  });
});
