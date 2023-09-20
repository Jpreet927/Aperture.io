import { Storage } from "@google-cloud/storage";
import fs from "fs";
import sharp from "sharp";

const storage = new Storage();

const rawBucketName = "jpreet927-img-raw-images";
const processedBucketName = "jpreet927-img-processed-images";

const localRawImagePath = "./raw-images";
const localProcessedImagePath = "./processed-images";

export function setupDirectories() {
    doesDirectoryExist(localRawImagePath);
    doesDirectoryExist(localProcessedImagePath);
}

// Uses Sharp to compress images
export async function processImage(
    rawImageName: string,
    processedImageName: string
) {
    await sharp(`${localRawImagePath}/${rawImageName}`)
        .resize(800)
        .toFormat("jpeg", { mozjpeg: true })
        .toFile(`${localProcessedImagePath}/${processedImageName}`)
        .then((info) => {
            console.log("Image compressed successfully.");
        })
        .catch((err) => {
            console.log("Error: image could not be compressed.");
        });
}

// fetches raw image from gc bucket and saves to local path
export async function downloadRawImage(fileName: string) {
    await storage
        .bucket(rawBucketName)
        .file(fileName)
        .download({ destination: `${localRawImagePath}/${fileName}` });

    console.log(
        `gs://${rawBucketName}/${fileName} downloaded to ${localRawImagePath}/${fileName}`
    );
}

// uploads processed image from local path to gc bucket
export async function uploadProcessedImage(fileName: string) {
    const bucket = storage.bucket(processedBucketName);

    await storage
        .bucket(processedBucketName)
        .upload(`${localProcessedImagePath}/${fileName}`, {
            destination: fileName,
        });

    console.log(
        `${localProcessedImagePath}/${fileName} uploaded to gs://${processedBucketName}/${fileName}`
    );

    await bucket.file(fileName).makePublic();
}

// deletes raw file from path, invoked after image uploaded to bucket
export function deleteRawFile(fileName: string) {
    return deleteFile(`${localRawImagePath}/${fileName}`);
}

// deleted processed file from path, invoked after image uploaded to bucket
export function deleteProcessedFile(fileName: string) {
    return deleteFile(`${localProcessedImagePath}/${fileName}`);
}

// deletes a file from file system based on path
function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`Error: Could not delete file at ${filePath}`);
                    reject(err);
                } else {
                    console.log(`File successfully deleted`);
                    resolve();
                }
            });
        } else {
            console.log(
                `Error: Could not delete - file not found at ${filePath}.`
            );
            resolve();
        }
    });
}

// checks if a directory exists, if not it is created
function doesDirectoryExist(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created at ${dirPath}`);
    }
}
