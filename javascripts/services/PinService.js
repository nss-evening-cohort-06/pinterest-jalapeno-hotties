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


  const getPinsByBoardId = (bid) => {
    let pinBoards = []; 
    let returnedPins = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/pinBoard.json?orderBy="bid"&equalTo="${bid}"`).then((fbPinBoards) => {
        Object.keys(fbPinBoards.data).forEach((key) => {
          fbPinBoards.data[key].id = key;
          pinBoards.push(fbPinBoards.data[key]);
        });
        return getAllPins();   
      }).then((allPins) => {
        allPins.forEach((pin) => {
          pinBoards.forEach((pinBoard) => {
            if (pin.id === pinBoard.pid) {
              pin.pbid = pinBoard.id; 
              returnedPins.push(pin); 
            }
          });
        });
        let uniqueReturnedPins = [...new Set(returnedPins)];
        resolve(uniqueReturnedPins); 
      }).catch((err) => {
        console.log(err); 
      });
    });
  };

  const deletePinBoardRecord = (pinBoardId) => {
    return $http.delete(`${FIREBASE_CONFIG.databaseURL}/pinBoard/${pinBoardId}.json`);
  };



    return {alertTimeout, getAllPins, getPinsByBoardId, addNewPin, getCurrentUserBoards, getBoardByUid, addNewUserBoard, addNewBoard, addNewPinBoard, deletePinBoardRecord};
 
});
