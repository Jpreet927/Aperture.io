import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";

initializeApp({ credential: credential.applicationDefault() });

const firestore = new Firestore();

const imageCollectionId = "images";

export interface Image {
    id?: string;
    uid?: string;
    filename?: string;
    status?: "processing" | "processed";
    title?: string;
    description?: string;
    category?: string;
    date?: Date;
}

async function getImage(id: string) {
    const snapshot = await firestore
        .collection(imageCollectionId)
        .doc(id)
        .get();
    return (snapshot.data() as Image) ?? {};
}

export function setImage(id: string, image: Image) {
    return firestore
        .collection(imageCollectionId)
        .doc(id)
        .set(image, { merge: true });
}

export async function isImageNew(id: string) {
    const image = await getImage(id);
    return image?.status === undefined;
}
