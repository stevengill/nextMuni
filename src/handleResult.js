const parseString = require("xml2js").parseString

module.exports = function(stringBuffer, bus) {
    let response = '';
    parseString(stringBuffer, function (err, result) {
        result = result['RTT']['AgencyList'][0]['Agency'][0]['RouteList'][0]['Route']
            result.forEach((route) => {
                //check if bus code is equivalent to what user asked 
                //include rapid lines
                if(route['$']['Code'] === bus || route['$']['Code'] === bus+'R') {
                    route['RouteDirectionList'][0]['RouteDirection'].forEach((routeDir) => {
                        //TODO: allow for users to add directions in bus.json
                        //TODO: only output direction suplied
                        let Direction = routeDir['$']['Name'];
                        let DepList= routeDir['StopList'][0]['Stop'][0]['DepartureTimeList'][0]['DepartureTime']; 
                        if(DepList) {
                            response += `Next ${route['$']['Name']} going ${Direction} is ${DepList.join(', ')} minutes away!\n`;
                        }
                    })
                }
            })
    });
    return response;
}
