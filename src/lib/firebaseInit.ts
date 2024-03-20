// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDShmkTXcPHe527wlgq5KOxp3aGb-67fLY",
  authDomain: "test3-cd890.firebaseapp.com",
  projectId: "test3-cd890",
  storageBucket: "test3-cd890.appspot.com",
  messagingSenderId: "739952821283",
  appId: "1:739952821283:web:3e0253e0dfb4ccc84a9d96",
  measurementId: "G-QLHRC589YF"
};

const app = initializeApp(firebaseConfig);
let messaging:any;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  messaging = getMessaging();
}

export const getClientToken = async () => {
  let currentToken = await   getToken(messaging,{vapidKey:'BHR9LyUxzMlfAh55RPB-WKCcyiYiCS3pWMojZ62Nubjxy2auaJY9E2X0ICAAA3alpHFbgrFC-0ssp0LzhKWUcMc'});
  return currentToken;
}

