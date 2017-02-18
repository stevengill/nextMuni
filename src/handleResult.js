"use strict"
const parseString = require("xml2js").parseString

/*
 * Parses xml from 511 server and returns a string.
 * @param {xml} res - response from 511 server
 * @param {string} bus - holds bus number
 * @return {string} response - response containing bus predictions
*/
module.exports = function(res, bus) {
    var response = '';
    console.log(res)
    console.log(bus)

    /* Converts xml to json.
     * @param {xml} res - response from 511 server
     * @param {function} - callback function containing json representation of res.
     */
    parseString(res, function (err, result) {
      console.log(err);
      console.log(result);
      console.log(result["body"]["predictions"][0]["direction"][0]["prediction"])
      //[0]["$"]['minutes']
      result = result["body"]["predictions"][0]["direction"][0]["prediction"]
      var minutesAway = []
        result.forEach((pred) => {
            console.log(pred['$']['minutes'])
            minutesAway.push(pred['$']['minutes'])

        })
        console.log("the bus is " + minutesAway.join(", ") + " minutes away")
      //console.log(JSON.stringify(result["body"]["predictions"][0]["direction"]))
        /*result = result['RTT']['AgencyList'][0]['Agency'][0]['RouteList'][0]['Route']
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
            })*/
            response += `Next ${bus} is ${minutesAway.join(", ")} minutes away!\n`;
    });
    return response;
}
