import express from "express";
import sharp from "sharp";
import {
    deleteProcessedFile,
    deleteRawFile,
    downloadRawImage,
    processImage,
    setupDirectories,
    uploadProcessedImage,
} from "./storage";
import { isImageNew, setImage } from "./firestore";

setupDirectories();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post("/process-image", async (req, res) => {
    let data;

    try {
        const message = Buffer.from(req.body.message.data, "base64").toString(
            "utf8"
        );
        data = JSON.parse(message);

        if (!data.name) {
            throw new Error("Invalid message payload received.");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send("Bad Request: missing file name");
    }

    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}.jpeg`;
    const imageId = inputFileName.split(".")[0];

    if (!isImageNew(imageId)) {
        return res.status(400).send("Image is already processing");
    } else {
        await setImage(imageId, {
            id: imageId,
            uid: imageId.split("-")[0],
            status: "processing",
        });
    }

    await downloadRawImage(inputFileName);

    try {
        await processImage(inputFileName, outputFileName);
    } catch (error) {
        await Promise.all([
            deleteRawFile(inputFileName),
            deleteProcessedFile(outputFileName),
        ]);
        console.log(`processing error ${error}`);
        return res.status(500).send("Error: image could not be processed");
    }

    await uploadProcessedImage(outputFileName);

    await setImage(imageId, {
        filename: outputFileName,
        status: "processed",
    });

    await Promise.all([
        deleteRawFile(inputFileName),
        deleteProcessedFile(outputFileName),
    ]);

    return res.status(200).send("Image processed successfully.");
});

app.listen(PORT, () => {
    console.log(`Image Processing running on http://localhost:${PORT}`);
});
