import firebase from "firebase/app";
import "firebase/database";
import {FirebaseConfig} from "./config";

firebase.initializeApp(FirebaseConfig);
export const database = firebase.database();
