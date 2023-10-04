"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getImages } from "@/lib/firebase/functions";
import { getImagesPaginated } from "@/lib/firebase/firebase";
import { Image } from "@/ts/types/Image";
import ApertureImage from "./image";
import { Skeleton } from "../ui/skeleton";

type props = {
    images: Image[];
    handleInfiniteScroll: () => Promise<void>;
    isLast: boolean;
};

const InfiniteScrollGrid = ({
    images,
    handleInfiniteScroll,
    isLast,
}: props) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const COLUMNS = 3;

    const bottom = useCallback((node: any) => {
        if (isLast === true) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && !isLast) {
                    await handleInfiniteScroll();
                }
            },
            { threshold: 1 }
        );

        if (node) observer.current.observe(node);
    }, []);

    return (
        <>
            {images ? (
                <>
                    <div className="w-full min-h-[400px] columns-2 gap-4 relative">
                        {images &&
                            images.map((img, index) => {
                                if (index === images.length - 1) {
                                    return (
                                        <ApertureImage
                                            key={index}
                                            image={img}
                                        />
                                    );
                                }
                                return (
                                    <ApertureImage key={index} image={img} />
                                );
                            })}
                    </div>
                    <div ref={bottom} />
                </>
            ) : (
                <div className="w-full columns-3 gap-4 relative">
                    {Array.from(Array(10)).map((_) => (
                        <Skeleton className="w-full h-[600px] mb-4" />
                    ))}
                </div>
            )}
        </>
    );

    // return (
    //     <>
    //         {images ? (
    //             <div className="flex gap-4">
    //                 <div className="w-[33%] gap-4 relative">
    //                     {images.slice(0, SLICE).map((img, index) => {
    //                         if (index === images.slice(0, SLICE).length - 1) {
    //                             console.log("last item in col 1");
    //                             return (
    //                                 <ApertureImage
    //                                     key={index}
    //                                     image={img}
    //                                     ref={lastElement}
    //                                 />
    //                             );
    //                         } else {
    //                             return (
    //                                 <ApertureImage key={index} image={img} />
    //                             );
    //                         }
    //                     })}
    //                 </div>
    //                 <div className="w-[33%] gap-4 relative">
    //                     {images.slice(SLICE, 2 * SLICE).map((img, index) => {
    //                         if (
    //                             index ===
    //                             images.slice(SLICE, 2 * SLICE).length - 1
    //                         ) {
    //                             console.log("last item in col 2");
    //                             return (
    //                                 <ApertureImage
    //                                     key={index}
    //                                     image={img}
    //                                     ref={lastElement}
    //                                 />
    //                             );
    //                         } else {
    //                             return (
    //                                 <ApertureImage key={index} image={img} />
    //                             );
    //                         }
    //                     })}
    //                 </div>
    //                 <div className="w-[33%] gap-4 relative">
    //                     {images.slice(2 * SLICE).map((img, index) => {
    //                         if (index === images.slice(2 * SLICE).length - 1) {
    //                             console.log("last item in col 3");
    //                             return (
    //                                 <ApertureImage
    //                                     key={index}
    //                                     image={img}
    //                                     ref={lastElement}
    //                                 />
    //                             );
    //                         } else {
    //                             return (
    //                                 <ApertureImage key={index} image={img} />
    //                             );
    //                         }
    //                     })}
    //                 </div>
    //             </div>
    //         ) : (
    //             <div className="w-full columns-1 gap-4 relative">
    //                 {Array.from(Array(10)).map((_) => (
    //                     <Skeleton className="w-full h-[600px] mb-4" />
    //                 ))}
    //             </div>
    //         )}
    //     </>
    // );
};

export default InfiniteScrollGrid;
