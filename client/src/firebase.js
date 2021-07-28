//Got this code from firebase account

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDrL2MCjgfryxP3jFHyD9uibQmcJqRt0LE",
    authDomain: "ecommerce-8fa15.firebaseapp.com",
    //databaseURL: "https://ecommerce-8fa15.firebaseio.com",
    projectId: "ecommerce-8fa15",
    storageBucket: "ecommerce-8fa15.appspot.com",
    messagingSenderId: "849912502742",
    appId: "1:849912502742:web:738850606b56d10f2f2c77",
    measurementId: "G-FQ74GY80DN"
};

// installed firebase using -> npm i firebase

firebase.initializeApp(firebaseConfig);         //Initialize firebase

export const auth = firebase.auth();                //exporting authentication given by firebase

export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();