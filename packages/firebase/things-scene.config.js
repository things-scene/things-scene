import icon from './assets/firebase.png';

var templates = [{
  type: 'firebase',
  description: 'firebase',
  group: 'dataSource',
  icon,
  model: {
    type: 'firebase',
    top: 50,
    left: 50,
    width: 100,
    height: 100,
    apiKey: "AIzaSyBtJayCKxuU-_lPaZvbLmOgqFlynMIu_sM",
    authDomain: "things-rtls.firebaseapp.com",
    databaseURL: "https://things-rtls.firebaseio.com",
    projectId: "things-rtls",
    storageBucket: "things-rtls.appspot.com",
    messagingSenderId: "32358989541",
    childDataPath: "boards/template/data",
    email: 'test@example.com',
    password: 'testpass'
  }
}];

export default {
  templates
};
