"use client";

import React from "react";
import { Image } from "@/ts/types/Image";
import { Skeleton } from "@/components/ui/skeleton";
import ApertureImage from "@/components/home/image";

const ImageGrid = ({ images }: { images: Image[] }) => {
    return (
        <>
            {images ? (
                <div className="w-full md:columns-3 columns-1 gap-4 relative">
                    {images &&
                        images.map((img) => (
                            <ApertureImage image={img} key={img.id} />
                        ))}
                </div>
            ) : (
                <div className="w-full md:columns-3 columns-1 gap-4 relative">
                    {Array.from(Array(10)).map((_, idx) => (
                        <Skeleton key={idx} className="w-full h-[600px] mb-4" />
                    ))}
                </div>
            )}
        </>
    );
};

export default ImageGrid;
