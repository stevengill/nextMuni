"use strict"

const alexa = require('alexa-app');
const fetch = require('node-fetch');
const app = new alexa.app();
const busesJson= require('./bus.json');
const busNames = [];
const handleResult = require('./handleResult');

console.log(busesJson)
//Build array of bus names + number
for (let key in busesJson) {
    console.log(key);
    busNames.push(busesJson[key]['name']);
}

//add this array to the app's dictionary to later use to generate utterances
app.dictionary = {
    "bus-names": busNames
};

app.launch(function(request,response) {
    console.log('launch request');
    //response.card("Hello World","This is an example card");
    //response.say('hello');
    response.shouldEndSession(false);
});

app.intent('nextbus', (request,response) => {
    console.log('nextBus')
    let bus = request.slot('bus');
    let url = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&stopId="
    if(busesJson[bus]) {
        url += busesJson[bus]['stopID'];
    } else {
        //send a response saying we didn't understand the request
        console.log('bus: ' + bus + ' was not in buses list');
        response.fail('Your bus is not supported');
        return false;
    }
    console.log(bus);
    console.log(typeof bus)

    console.log(url);
    return fetch(url)
    .then(function(res) {
        //send result to back to echo
        response.say(handleResult(res.text(), bus)).send();
    });
  }
);

app.sessionEnded(function(request,response) {
    // No response necessary
    console.log('session end');
});

exports.handler = app.lambda();

//console.log(app.utterances());
//console.log(app.schema());
