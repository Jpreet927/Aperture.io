"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/home/hero";
import InfiniteScrollGrid from "@/components/home/infinitescrollgrid";
import { Image } from "@/ts/types/Image";
import { getFirstNImages, getImagesPaginated } from "@/lib/firebase/firebase";

export default function Home() {
    const [images, setImages] = useState<Image[]>([]);
    let isLast = false;
    const LIMIT = 3;

    // useEffect(() => {
    //     const getData = async () => {
    //         const response = await getFirstNImages(LIMIT);
    //         setImages(response);
    //     };

    //     getData();
    // }, []);

    const handleInfiniteScroll = async () => {
        if (isLast) return;

        const { data, lastImage }: { data: Image[]; lastImage: boolean } =
            await getImagesPaginated(1, LIMIT);

        isLast = lastImage;
        setImages((prev) => [...prev, ...data]);

        return isLast;
    };

    return (
        <main className="">
            <Hero />
            <div className="px-80 py-16 flex flex-col gap-8">
                <h3 className="text-3xl font-bold">Recent Images</h3>
                <InfiniteScrollGrid
                    images={images}
                    handleInfiniteScroll={handleInfiniteScroll}
                    isLast={isLast}
                />
            </div>
        </main>
    );
}
