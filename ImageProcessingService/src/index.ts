import express from "express";
import sharp from "sharp";

const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/process-image", async (req, res) => {
    const imagePath = req.body.imagePath;
    const compressedPath = req.body.outputPath;

    if (!imagePath || !compressedPath) {
        res.status(400).send("Error: File not found.");
    }

    try {
        await sharp(imagePath)
            .resize(800)
            .toFormat("jpeg", { mozjpeg: true })
            .toFile(compressedPath + ".jpeg");

        res.status(200).send("Image processed successfully.");
    } catch (error) {
        res.status(500).send("Error: image could not be processed.");
    }
});

app.listen(PORT, () => {
    console.log(`Image Processing running on http://localhost:${PORT}`);
});
