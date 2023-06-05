import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyClYSwMkqHU65fjZ-EX1n5pNBeEr_P20Kk",
  authDomain: "chatapp-59cb0.firebaseapp.com",
  projectId: "chatapp-59cb0",
  storageBucket: "chatapp-59cb0.appspot.com",
  messagingSenderId: "332362156668",
  appId: "1:332362156668:web:9fa9fc6ce198c405e757f9"
};

export const app = initializeApp(firebaseConfig);