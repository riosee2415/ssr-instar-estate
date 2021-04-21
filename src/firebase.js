import firebase from "firebase/app";
import "firebase/storage";

import dotenv from "dotenv";
dotenv.config();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DB_URL,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCgF4gjyoYzeRKi9avMHtnTjG-1rwHu5Ho",
  authDomain: "storage-4leaf.firebaseapp.com",
  databaseURL: "https://storage-4leaf.firebaseio.com",
  storageBucket: "storage-4leaf.appspot.com",
};

let storageRef = {};

try {
  if (typeof window !== "undefined" && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const storage = firebase.storage();

  storageRef = storage.ref();
} catch (error) {
  console.log(error);
}

export default storageRef;

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
