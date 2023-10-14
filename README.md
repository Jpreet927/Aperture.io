# Aperture.io
Aperture.io is a website where photographers can showcase their work to the rest of the user base.

![Aperture.io branding image](https://github.com/Jpreet927/Aperture.io/blob/main/web-client/assets/branding/ApertureIO.jpg)

### Web Client
The web client was built with Next.js 13 and Tailwind CSS. Users are presented with the homepage, containing recent images. Users can also expand images to view more details and related images. Authenticated users can submit images through the upload form, which will create a document in the Firestore database with related metadata and upload the raw image file to a Google Cloud Storage bucket.

### Image Processing Service
Newly uploaded files in the Raw Image Bucket will publish a job to the Google Cloud Pub/Sub queue. The image processing service hosted on Google Cloud Run will poll the Pub/Sub queue for new jobs. This service will fetch the newly uploaded raw file from the Raw Image Bucket, then perform image compression and resizing operations by employing Sharp, then finally upload the processed file to a Processed Image Bucket which is served to the web client.

### API Service
This service is the application's REST API, which uses Firebase cloud functions deployed on Google Cloud.

### Technologies Used
- Next.js 13
- Express.js
- Node.js
- TypeScript
- Tailwind CSS
- Google Cloud Run
- Google Cloud Storage
- Google Cloud Pubsub
- Firebase Authentication
- Firestore
- Firebase Functions
- Docker
