var alexa = require('alexa-app');
var app = new alexa.app('sample');
//var http = require('http');
var token = require('../config.json');
var buses = require('../bus.json');
var busNames = [];
var handleResult = require('./handleResult');

token = token['511Token'];

console.log(buses)
//Build array of bus names + number
for (var key in buses) {
    console.log(key);
    busNames.push(buses[key]['name']);
}
//add this array to the app's dictionary to later use to generate utterances
app.dictionary = {
    "bus-names": busNames
};

app.launch(function(request,response) {
    console.log('launch request');
    //response.card("Hello World","This is an example card");
    //resonse.say('hi');
    response.shouldEndSession(false);
});

app.intent('nextBus',
  {
    "slots":{"bus":"NUMBER"}
    ,"utterances":[ "{the|when is the|when's the} next {bus-names|bus}"]
  },
  function(request,response) {
    console.log('nextBus')
    var bus = request.slot('bus');
    var getSchedule = false;
    var url = "http://services.my511.org/Transit2.0/GetNextDeparturesByStopName.aspx?token=" + token + "&agencyName=SF-MUNI&stopName=";
    if(buses[bus]) {
        getSchedule = true;
        url += buses[bus]['stopName'];
    } else {
        //send a response saying we didn't understand the request   
        console.log('bus: ' + bus + ' was not in buses list');
    }
    console.log(bus);
    console.log(typeof bus)
        
    if(getSchedule) {
        console.log(url);
        /*http.get(url, function(res) {
            var buffer = "";
            res.on( "data", function( data ) { buffer = buffer + data; } );
            res.on( "end", function( data ) { 
                var alexaresp = handleResult(buffer.toString(), bus);
                console.log(alexaresp)
                response.send(alexaresp)
            });
        });*/
    };
    // Return false immediately so alexa-app doesn't send the response 
    return false; 
  }
);
app.sessionEnded(function(request,response) {
    // No response necessary
    console.log('session end'); 
});

exports.handler = app.lambda();

console.log(app.utterances());
console.log(app.schema());
