var parseString = require("xml2js").parseString

module.exports = function(stringBuffer, bus) {
    var response = '';
    parseString(stringBuffer, function (err, result) {
        result = result['RTT']['AgencyList'][0]['Agency'][0]['RouteList'][0]['Route']
            result.forEach(function(route) {
                //check if bus code is equivalent to what user asked 
                //include rapid lines
                if(route['$']['Code'] === bus || route['$']['Code'] === bus+'R') {
                    route['RouteDirectionList'][0]['RouteDirection'].forEach(function(routeDir) {
                        //TODO: allow for users to add directions in bus.json
                        //TODO: only output direction suplied
                        var Direction = routeDir['$']['Name'];
                        var DepList= routeDir['StopList'][0]['Stop'][0]['DepartureTimeList'][0]['DepartureTime']; 
                        if(DepList) {
                            response += 'Next '+route['$']['Name']+' going '+Direction+' is '+DepList.join(', ')+' minutes away!\n';
                        }
                    })
                }
            })
    });
    return response;
}
