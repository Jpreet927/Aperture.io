"use client";

import React, { useState, useRef, useCallback } from "react";
import { Image } from "@/ts/types/Image";
import ApertureImage from "./image";
import { Skeleton } from "../ui/skeleton";

type props = {
    images: Image[];
    handleInfiniteScroll: () => Promise<boolean | undefined>;
    isLast: boolean;
};

const InfiniteScrollGrid = ({ images, handleInfiniteScroll }: props) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isLast, setIsLast] = useState(false);
    const COLUMNS = 3;

    const bottom = useCallback(
        (node: any) => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            observerRef.current = new IntersectionObserver(
                async (entries) => {
                    if (isLast) return;
                    console.log(isLast);
                    if (entries[0].isIntersecting && !isLast) {
                        const isLastItems = await handleInfiniteScroll();
                        if (isLastItems === true) {
                            setIsLast(() => true);
                        }
                    }
                },
                { threshold: 1 }
            );

            if (node) observerRef.current.observe(node);
        },
        [isLast]
    );

    return (
        <>
            {images ? (
                <>
                    <div className="flex gap-4">
                        <div className="w-[33%] gap-4 relative">
                            {images
                                .filter((_, idx) => idx % COLUMNS === 0)
                                .map((img, index) => (
                                    <ApertureImage key={index} image={img} />
                                ))}
                        </div>
                        <div className="w-[33%] gap-4 relative">
                            {images
                                .filter((_, idx) => idx % COLUMNS === 1)
                                .map((img, index) => (
                                    <ApertureImage key={index} image={img} />
                                ))}
                        </div>
                        <div className="w-[33%] gap-4 relative">
                            {images
                                .filter((_, idx) => idx % COLUMNS === 2)
                                .map((img, index) => (
                                    <ApertureImage key={index} image={img} />
                                ))}
                        </div>
                    </div>
                    <div ref={bottom} />
                </>
            ) : (
                <div className="w-full columns-1 gap-4 relative">
                    {Array.from(Array(10)).map((_) => (
                        <Skeleton className="w-full h-[600px] mb-4" />
                    ))}
                </div>
            )}
        </>
    );
};

export default InfiniteScrollGrid;
