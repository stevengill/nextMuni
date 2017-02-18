"use strict"
const fs = require("fs")
const handleResult = require('../src/handleResult')
const should = require('should')


const sampleResult = fs.readFileSync("test/sampleresult.xml", {"encoding":"utf8"})

describe('handleResult', function() {
    let bus = '21';
    it('check returned value', function() {
        let response = handleResult(sampleResult, bus);
        response.should.be.type('string');
        console.log("this is fun", response)

        response.should.be.eql('Next 21 is 8, 29, 50 minutes away!\n');
    });
})


//console.log(handleResult(sampleResult, '5'))
