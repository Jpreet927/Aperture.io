/* eslint-disable */
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();

const rawBucketName = "jpreet927-img-raw-images";

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

export const generateUploadURL = onCall(
    { maxInstances: 1 },
    async (request) => {
        if (!request.auth) {
            throw new functions.https.HttpsError(
                "failed-precondition",
                "User not authenticated",
            );
        }

        const auth = request.auth;
        const data = request.data;
        const bucket = storage.bucket(rawBucketName);

        const fileName = `${auth.uid}-${Date.now()}-${data.fileExtension}`;

        const [url] = await bucket.file(fileName).getSignedUrl({
            version: "v4",
            action: "write",
            expires: Date.now() + 15 * 60 * 1000,
        });

        return { url, fileName };
    }
);

const imageCollectionId = "images";
export const getImages = onCall({ maxInstances: 1 }, async () => {
    const snapshot = await firestore
        .collection(imageCollectionId)
        .limit(20)
        .get();
    snapshot.docs.map((doc) => doc.data());
});

/* eslint-enable */
