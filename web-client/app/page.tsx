"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/home/hero";
import ImagesGrid from "@/components/home/imagesgrid";
import { Image } from "@/ts/types/Image";
import { getImages } from "@/lib/firebase/functions";

export default function Home() {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await getImages();
            setImages(response);
        };

        getData();
    }, []);

    return (
        <main className="">
            <Hero />
            <div className="px-80 py-16 flex flex-col gap-8">
                <h3 className="text-3xl font-bold">Recent Images</h3>
                <ImagesGrid images={images} />
            </div>
        </main>
    );
}
