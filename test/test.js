var assert = require('assert');
var sampleResult = require('./sampleResult')
var handleResult = require('../src/handleResult')
var should = require('should')

describe('handleResult', function() {
    var bus = '5';
    it('check returned value', function() {
        var response = handleResult(sampleResult, bus);
        response.should.be.type('string');
        response.should.be.eql('Next 5-Fulton going Inbound to Downtown is 7, 22, 42 minutes away!\nNext 5-Fulton going Outbound to Ocean Beach is 8, 20 minutes away!\n');
    });
})

//console.log(handleResult(sampleResult, '5'))
