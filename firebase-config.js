import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 👇 Firebase Console > Project settings > Your apps > Web app se apna config yahan paste karo
export const firebaseConfig = {
  apiKey: "AIzaSyAj2F9C0ru9a0OzfQTa1KgwiBk-W88OMPM",
  authDomain: "click-earn-india-c9f0c.firebaseapp.com",
  projectId: "click-earn-india-c9f0c",
  storageBucket: "click-earn-india-c9f0c.firebasestorage.app",
  messagingSenderId: "56962745525",
  appId: "1:56962745525:web:564ee9bd75a183f1d96afc",
  measurementId: "G-20YEG0T7H2"
};

// 👇 Website ki settings
export const SETTINGS = {
  pointsPerRupee: 100,   // 100 points = ₹1
  adReward: 5,           // ek ad ke points
  adSeconds: 15,         // countdown seconds
  dailyBonus: 50,        // daily check-in points
  spinsPerDay: 2,        // roz kitne spin
  quizPerCorrect: 2,     // quiz mein har sahi jawab ke points
  minWithdraw: 150,      // minimum withdrawal ₹
  adminEmail: "dookai79@gmail.com" // apna admin email (firestore.rules mein bhi yehi daalna)
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
