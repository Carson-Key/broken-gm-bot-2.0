// Packages
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBR0Q0K0T7juqjHQkVA-cbijvvJTjrOGzE",
    authDomain: "cashflow-bot.firebaseapp.com",
    projectId: "cashflow-bot",
    storageBucket: "cashflow-bot.appspot.com",
    messagingSenderId: "361238414759",
    appId: "1:361238414759:web:66b99f2b82fa4acbc02282"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

module.exports.app = app
module.exports.db = db