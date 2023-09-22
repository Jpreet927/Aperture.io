"use client";

import React, { useState, useEffect } from "react";
import { getImages } from "@/lib/firebase/functions";
import NextImage from "next/image";
import { Image } from "@/ts/types/Image";

const ImagesGrid = () => {
    const BUCKET = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET;
    const [images, setImages] = useState<Image[] | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getImages();
            setImages(response);
        };
        getData();
    }, []);

    return (
        <div className="">
            {images &&
                images.map((img) => (
                    <NextImage
                        src={BUCKET! + img.filename}
                        alt={"Photo of " + img.title!}
                        priority
                        width={400}
                        height={400}
                    />
                ))}
        </div>
    );
};

export default ImagesGrid;
