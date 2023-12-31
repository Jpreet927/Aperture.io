"use client";

import React, { useState } from "react";
import { getImagesPaginated } from "@/lib/firebase/firebase";
import Hero from "@/components/home/hero";
import InfiniteScrollGrid from "@/components/home/infinitescrollgrid";
import { Image } from "@/ts/types/Image";

export default function Home() {
    const [images, setImages] = useState<Image[]>([]);
    let isLast = false;
    const LIMIT = 10;

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
            <div className="xl:px-80 lg:px-48 px-12 py-16 flex flex-col gap-8">
                <h3 className="text-3xl font-bold">Recent Images</h3>
                <div className="h-[1px] w-full bg-primary-foreground"></div>
                <InfiniteScrollGrid
                    images={images}
                    handleInfiniteScroll={handleInfiniteScroll}
                    isLast={isLast}
                />
            </div>
        </main>
    );
}
