"use strict";

app.service("PinService", function($http, $q, $rootScope, $timeout, FIREBASE_CONFIG) {

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
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`, JSON.stringify(pin)).then((result) => {
                resolve(result);  
            }).catch((err) => {
                reject(err);  
            });
        });
    };

    const alertTimeout = (timeoutInSeconds) => {
        return $q((resolve, reject) => {
            $timeout(() => {
                $('.alert').alert('close');
                resolve(); 
            }, timeoutInSeconds * 1000);  
        });    
    };


    return {getAllPins, addNewPin, alertTimeout};
});