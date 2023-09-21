import { getFunctions, httpsCallable } from "firebase/functions";
import { functions } from "./firebase";
import { Image } from "@/ts/types/Image";

const generateUploadUrl = httpsCallable(functions, "generateUploadURL");
const getImagesFunction = httpsCallable(functions, "getImages");

export async function uploadImage(file: File) {
    const response: any = await generateUploadUrl({
        fileExtension: file.name.split(".").pop(),
    });

    await fetch(response?.data?.url, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });

    return;
}

export async function getImages() {
    const response = await getImagesFunction();
    return response.data as Image[];
}
