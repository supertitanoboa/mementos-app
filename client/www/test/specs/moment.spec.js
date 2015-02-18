/*old chai test
var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('Moment unit tests', function() {
  var test = 5;

  it('test should be a number', function() {
    expect(test).to.be.a('number');
  });
});*/

// new jasmine test
describe('Moment', function() {
  var test = 5;

  it('should equal 5', function() {
    expect(test).toEqual(5);
  });
});

