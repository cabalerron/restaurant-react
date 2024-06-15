import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB0V6BtF1RcsNX2oSlAVdM4hFC3BOO0lOU",
  authDomain: "restaurant-81a58.firebaseapp.com",
  databaseURL: "https://restaurant-81a58-default-rtdb.firebaseio.com",
  projectId: "restaurant-81a58",
  storageBucket: "restaurant-81a58.appspot.com",
  messagingSenderId: "800287479914",
  appId: "1:800287479914:web:8fd5aac2a75304bc625213"
};


const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };
