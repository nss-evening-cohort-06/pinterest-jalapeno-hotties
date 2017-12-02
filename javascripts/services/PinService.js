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

    const getBoardByUid = (userUid) => {
      let userBoards = [];
      return $q((resolve,reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/userBoard.json?orderBy="uid"&equalTo="${userUid}"`).then((fbUserBoards) => {
           Object.keys(fbUserBoards.data).forEach((key) => {
             fbUserBoards.data[key].id = key;
             userBoards.push(fbUserBoards.data[key]);
            });
            resolve(userBoards);
        }).catch((error) => {
          console.log("error in gatBoardByUid in PinService", error);
        });
      });
    };

    const getBoards = () =>{
      let userBoardWithNames = [];
      return $q((resolve, reject) => {
          $http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json`).then((results) => {
          let fbBoards = results.data;
          Object.keys(fbBoards).forEach((key) => {
              fbBoards[key].id = key;
              userBoardWithNames.push(fbBoards[key]);
          });
            resolve(userBoardWithNames);
          }).catch((error)=>{
          console.log("error in getBoardNames in PinService", error);
        });
      });
    };

  const getCurrentUserBoards = (uid) => {
    let userBoards = [];
    let smushedBoards = [];
    return $q((resolve, reject) => {
      getBoardByUid(uid).then((fbUserBoards) => {
        userBoards = fbUserBoards;
        return getBoards();
      }).then((allBoards) => {
        userBoards.forEach((userBoard) => {
          allBoards.forEach((board) => {
            if (userBoard.bid === board.id) {
              let userBoardObject = {name: board.name, id: board.id};
              smushedBoards.push(userBoardObject);
            }
          });
        });
        resolve(smushedBoards);
      });
    });
  };

  const addNewBoard = (board) => {
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/boards.json`, JSON.stringify(board));
  };

  const addNewUserBoard = (userBoard) => {
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/userBoard.json`, JSON.stringify(userBoard));
  };

  const addNewPinBoard = (pinBoard) => {
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/pinBoard.json`, JSON.stringify(pinBoard));
    
  };

    return {getAllPins, addNewPin, getCurrentUserBoards, getBoardByUid, addNewUserBoard, addNewBoard, addNewPinBoard};
});
