## Next Muni/ Next Bus Alexa App

This is an Alexa app to connect to the 511 service to get real time schedule for bay area buses and trains.

## Setup for yourself
    1. Clone this repo and run `npm install`
    3. Create a alexa app on amazon alexa website
    4. Make sure you have enabled your Alexa for development
    5. Setup a Amazon lambda instanace and connect with alexa app
    6. Generate utterances and copy over to alexa app website
    7. Add buses to `bus.json`
    8. Zip this repo and upload to lambda 


## 511 API Docs

[511 API](http://assets.511.org/pdf/RTT%20API%20V2.0%20Reference.pdf).


## Set the bus stop

Add your bus number, stop name and agency in bus.json

### Possible Agencies

    * AC Transit
    * BART
    * Caltrain
    * Dumbarton Express
    * LAVTA
    * Marin Transit
    * SamTrans
    * SF-MUNI
    * Vine (Napa County)
    * VTA
    * WESTCAT

You can see all agencies at [http://services.my511.org/Transit2.0/GetAgencies.aspx?token=YOURTOKEN](http://services.my511.org/Transit2.0/GetAgencies.aspx?token=)

## Generate zip for upload to lambda
    zip -r src.zip .
