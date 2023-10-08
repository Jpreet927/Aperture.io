"use client";

import React, { useState, useEffect } from "react";
import { getImages } from "@/lib/firebase/functions";
import { Image } from "@/ts/types/Image";
import ApertureImage from "@/components/home/image";
import { Skeleton } from "@/components/ui/skeleton";

const ImageGrid = ({ images }: { images: Image[] }) => {
    return (
        <>
            {images ? (
                <div className="w-full md:columns-3 columns-1 gap-4 relative">
                    {images &&
                        images.map((img) => <ApertureImage image={img} />)}
                </div>
            ) : (
                <div className="w-full md:columns-3 columns-1 gap-4 relative">
                    {Array.from(Array(10)).map((el) => (
                        <Skeleton className="w-full h-[600px] mb-4" />
                    ))}
                </div>
            )}
        </>
    );
};

export default ImageGrid;
