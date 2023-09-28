import { httpsCallable } from "firebase/functions";
import { createImageDoc, functions } from "./firebase";
import { Image } from "@/ts/types/Image";
import { FormData } from "@/ts/types/FormData";

const generateUploadUrl = httpsCallable(functions, "generateUploadURL");
const getImagesFunction = httpsCallable(functions, "getImages");

export async function uploadImage(data: FormData) {
    const response: any = await generateUploadUrl({
        fileExtension: data.file.name.split(".").pop(),
    });

    const getSignedURL = fetch(response?.data?.url, {
        method: "PUT",
        body: data.file,
        headers: {
            "Content-Type": data.file.type,
        },
    });
    const uploadToFirestore = createImageDoc(response?.data?.fileName, data);

    await Promise.all([getSignedURL, uploadToFirestore]);
    
    return;
}

export async function getImages() {
    const response = await getImagesFunction();
    return response.data as Image[];
}
