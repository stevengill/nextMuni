var alexa = require('alexa-app');
var app = new alexa.app('sample');
var http = require('http');
var parseString = require('xml2js').parseString;
var token = require('./config.json')['511Token'];
var buses = require('./bus.json');
var busNames = [];

//Build array of bus names + number
for (key in buses) {
    console.log(key);
    busNames.push(buses[key]['name']);
}
//add this array to the app's dictionary to later use to generate utterances
app.dictionary = {
    "bus-names": busNames
};

console.log(busNames)

app.launch(function(request,response) {
    //response.say("Hello World");
    console.log('launch request');
    //response.card("Hello World","This is an example card");
    response.say('welcome to next bus');
    response.shouldEndSession(false);
});

app.intent('nextBus',
  {
    "slots":{"bus":"NUMBER"}
    ,"utterances":[ "{the|when is the|when's the} next {bus-names|bus}"]
  },
  function(request,response) {
    console.log('nextBus')
    //5
    //http://services.my511.org/Transit2.0/GetNextDeparturesByStopName.aspx?token=deec0e30-4a6f-4bec-b995-0accc4eb8b07&agencyName=SF-MUNI&stopName=Fulton%20St%20and%20Masonic%20Ave
    //43
    //http://services.my511.org/Transit2.0/GetNextDeparturesByStopName.aspx?token=deec0e30-4a6f-4bec-b995-0accc4eb8b07&agencyName=SF-MUNI&stopName=Masonic%20Ave%20and%20Hayes%20St
    //21
    //http://services.my511.org/Transit2.0/GetNextDeparturesByStopName.aspx?token=deec0e30-4a6f-4bec-b995-0accc4eb8b07&agencyName=SF-MUNI&stopName=Hayes%20St%20and%20Masonic%20Ave
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
        http.get(url, function(res) {
        //console.log(res)
        //console.log(body)
        var buffer = "";
        res.on( "data", function( data ) { buffer = buffer + data; } );
        res.on( "end", function( data ) { 
            //console.log( buffer.toString() ); 
            //response.send();
            parseString(buffer.toString(), function (err, result) {
                console.log(JSON.stringify(result));
               	result = result['RTT']['AgencyList'][0]['Agency'][0]['RouteList'][0]['Route']
				result.forEach(function(route) {
    				//check if bus code is equivalent to what user asked 
    				if(route['$']['Code'] === bus || route['$']['Code'] === bus+'R') {
        				route['RouteDirectionList'][0]['RouteDirection'].forEach(function(routeDir) {
            				//TODO: allow for users to add directions in bus.json
                            //TODO: only output direction suplied
                            var Direction = routeDir['$']['Name'];
            				var DepList= routeDir['StopList'][0]['Stop'][0]['DepartureTimeList'][0]['DepartureTime'] 
            				console.log(DepList)
            				if(DepList) {
                				response.say('Next '+route['$']['Name']+' going '+Direction+' is ' + DepList.join(', ')+ ' minutes away!\n');
            				}
        				})
    				}
				}) 
                response.send();
            });
        
        } );
        });
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
