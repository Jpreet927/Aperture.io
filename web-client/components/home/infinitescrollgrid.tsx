"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Image } from "@/ts/types/Image";
import { Skeleton } from "@/components/ui/skeleton";
import { debounce } from "@/lib/helpers";
import ApertureImage from "./image";
import Loading from "./loading";

type props = {
    images: Image[];
    handleInfiniteScroll: () => Promise<boolean | undefined>;
    isLast: boolean;
};

const InfiniteScrollGrid = ({ images, handleInfiniteScroll }: props) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isLast, setIsLast] = useState<boolean>(false);
    const [columns, setColumns] = useState<number>(3);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const bottom = useCallback(
        (node: any) => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            observerRef.current = new IntersectionObserver(
                async (entries) => {
                    if (isLast) return;

                    if (entries[0].isIntersecting && !isLast) {
                        setIsLoading(() => true);

                        const isLastItems = await handleInfiniteScroll();
                        if (isLastItems === true) {
                            setIsLast(() => true);
                        }

                        setIsLoading(() => false);
                    }
                },
                { threshold: 1 }
            );

            if (node) observerRef.current.observe(node);
        },
        [isLast]
    );

    useEffect(() => {
        const debouncedWindowResize = debounce(function handleWindowResize() {
            if (window.innerWidth < 768) {
                setColumns(1);
            } else {
                setColumns(3);
            }
        }, 500);

        window.addEventListener("resize", debouncedWindowResize);

        return () =>
            window.removeEventListener("resize", debouncedWindowResize);
    });

    return (
        <>
            {images ? (
                <>
                    <div className="flex gap-4">
                        <div className="md:w-[33%] w-full gap-4 relative">
                            {images
                                .filter((_, idx) => idx % columns === 0)
                                .map((img, index) => (
                                    <ApertureImage key={index} image={img} />
                                ))}
                        </div>
                        <div className="w-[33%] md:block hidden gap-4 relative">
                            {images
                                .filter((_, idx) => idx % columns === 1)
                                .map((img, index) => (
                                    <ApertureImage key={index} image={img} />
                                ))}
                        </div>
                        <div className="w-[33%] md:block hidden gap-4 relative">
                            {images
                                .filter((_, idx) => idx % columns === 2)
                                .map((img, index) => (
                                    <ApertureImage key={index} image={img} />
                                ))}
                        </div>
                    </div>
                    <div ref={bottom} />
                    {isLoading && <Loading />}
                </>
            ) : (
                <div className="w-full columns-1 gap-4 relative">
                    {Array.from(Array(10)).map((_, idx) => (
                        <Skeleton key={idx} className="w-full h-[600px] mb-4" />
                    ))}
                </div>
            )}
        </>
    );
};

export default InfiniteScrollGrid;
