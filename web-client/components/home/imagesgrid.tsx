"use client";

import React, { useState, useEffect } from "react";
import { getImages } from "@/lib/firebase/functions";
import NextImage from "next/image";
import { Image } from "@/ts/types/Image";
import ApertureImage from "./image";

const ImagesGrid = () => {
    const [images, setImages] = useState<Image[] | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getImages();
            setImages(response);
        };
        getData();
    }, []);

    return (
        <div className="w-full columns-3 gap-4 relative">
            {images && images.map((img) => <ApertureImage image={img} />)}
        </div>
    );
};

export default ImagesGrid;
