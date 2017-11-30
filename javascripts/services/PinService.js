"use strict";

app.service("PinService", function($http, $q, $rootScope, FIREBASE_CONFIG) {

    const getAllPins = () => {
        let pins = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json`).then((results) => {
                let fbPins = results.data;
                Object.keys(fbPins).forEach((key) => {
                    fbPins[key].id = key; 
                    pins.push(fbPins[key]);
                });
                resolve(pins);
                
            }).catch((err) => {
                reject("error in getAllPins in PinService", err);
            });
        });
    };

    const addNewPin = (pin) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`, JSON.stringify(pin));
    };


    return {getAllPins, addNewPin};
});