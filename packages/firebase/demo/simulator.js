/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
var firebase = require('firebase')

firebase.initializeApp({
  apiKey: "AIzaSyCfqM_viu8mcuUbIupgv0Qh2xD6NWf1thA",
  authDomain: "things-board-399e6.firebaseapp.com",
  databaseURL: "https://things-board-399e6.firebaseio.com",
  projectId: "things-board-399e6",
  storageBucket: "things-board-399e6.appspot.com",
  messagingSenderId: "74237077394",
})

var email = 'test@example.com';
var password = 'testpass';
var mo_path = "boards/template/data/CIRC-03";
var simulation_path = "boards/template/simulation/CIRC-03";

this._database = firebase.database();

const auth = firebase.auth();

var self = this
var exit = false

auth.onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log('logged in');
    var ref_mo = firebase.database().ref().child(mo_path);
    var ref_sim = firebase.database().ref().child(simulation_path);
    setInterval(() => {
      var data = {
        location: {
          x: Math.round(Math.random() * 400),
          y: Math.round(Math.random() * 400)
        },
        status: Math.floor(Math.random() * 5)
      }
      ref_mo.set(data); // Moving Object가 없는 경우에는 set을 해야할 것 같음.
      // ref_mo.update(data);
      ref_sim.push(data);
    }, 1000)
  } else {
    if (exit) {
      console.log('logged out, about to exit');
      process.exit(1);
    }
  }
})

const promise = email ? auth.signInWithEmailAndPassword(email, password) : auth.signInAnonymously();

promise.catch(e => console.log(e.message))

setTimeout(() => {
  exit = true;
  firebase.auth().signOut();
}, 100000);
