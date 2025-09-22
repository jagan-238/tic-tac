import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWoalk1LmrdNdngG_jCA2wzDu0_rxR6Oc",
  authDomain: "web-b43.firebaseapp.com",
  databaseURL: "https://web-b43-default-rtdb.firebaseio.com",
  projectId: "web-b43",
  storageBucket: "web-b43.firebasestorage.app",
  messagingSenderId: "1043699448922",
  appId: "1:1043699448922:web:75aca8f58416f651e4ec63",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
