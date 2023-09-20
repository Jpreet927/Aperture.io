/* eslint-disable */
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";

initializeApp();

const firestore = new Firestore();

export const helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

export const createUser = functions.auth.user().onCreate((user) => {
    const userInfo = {
        uid: user.uid,
        email: user.email,
        photoUrl: user.photoURL,
    };

    logger.info(`User created: ${JSON.stringify(userInfo)}`);

    firestore.collection("users").doc(user.uid).set(userInfo);

    return;
});
/* eslint-enable */
