import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import config from "./config";

class Firebase {
  constructor() {
    this.app = firebase.initializeApp(config);
    this.auth = this.app.auth();
    this.db = this.app.firestore();
    this.functions = firebase.functions();

    this.app
      .firestore()
      .enablePersistence()
      .then(() => console.log("Persistence working!"))
      .catch(this.log);
  }
}

export default Firebase;
