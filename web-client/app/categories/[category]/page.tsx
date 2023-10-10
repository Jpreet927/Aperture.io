"use client";

import React, { useEffect, useState } from "react";
import { getImagesByCategory } from "@/lib/firebase/firebase";
import { Image } from "@/ts/types/Image";
import { selectToCategory } from "@/ts/constants/category";
import ImageGrid from "@/components/image/imagegrid";

const CategoryPage = ({ params }: { params: { category: string } }) => {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const unsubscribe = async () => {
            const data = await getImagesByCategory(params.category);
            setImages(data);
        };

        unsubscribe();
    }, []);

    return (
        <div className="xl:px-80 lg:px-48 px-12 pt-8 pb-16 gap-8 flex flex-col">
            <div className="flex gap-4 items-center">
                <h1 className="font-bold text-3xl">
                    {
                        selectToCategory[
                            params.category as keyof typeof selectToCategory
                        ]
                    }
                </h1>
                <div className="h-[30px] w-[1px] bg-primary-foreground"></div>
                <p className="text-sm text-muted-foreground">
                    {images.length === 1
                        ? `${images.length} image`
                        : `${images.length} images`}
                </p>
            </div>
            <div className="h-[1px] w-full bg-primary-foreground"></div>
            <ImageGrid images={images} />
        </div>
    );
};

export default CategoryPage;
