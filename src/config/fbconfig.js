import firebase from 'firebase/app';

export const firebaseConfig = {
  apiKey: "AIzaSyB7RORvCfqyVLhtaD-5sQhYPhxi6zPrU5E",
  authDomain: "link-shortener-2f25c.firebaseapp.com",
  databaseURL: "https://link-shortener-2f25c.firebaseio.com",
  projectId: "link-shortener-2f25c",
  storageBucket: "link-shortener-2f25c.appspot.com",
  messagingSenderId: "912255930230",
  appId: "1:912255930230:web:7231f0c1cfd94cc3873457"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
