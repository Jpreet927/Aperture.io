"use client";

import React, { useState, useEffect } from "react";
import {
    getUserData,
    getImageData,
    getImagesByCategory,
} from "@/lib/firebase/firebase";
import { User } from "@/ts/types/User";
import { Image } from "@/ts/types/Image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NextImage from "next/image";
import { convertLowerCaseToPascalCase } from "@/lib/helpers";
import { CATEGORIES } from "@/ts/constants/category";
import ImagesGrid from "@/components/home/imagesgrid";

const ImagePage = ({
    params,
}: {
    params: { imageId: string; userId: string };
}) => {
    const [user, setUser] = useState<User>();
    const [image, setImage] = useState<Image>();
    const [relatedImages, setRelatedImages] = useState<Image[]>([]);
    const BUCKET = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET;

    useEffect(() => {
        const unsubscribe = async () => {
            const getImage = getImageData(params.imageId);
            const getUser = getUserData(params.userId);

            const [imageData, userData] = await Promise.all([
                getImage,
                getUser,
            ]);

            const related = await getImagesByCategory(imageData.category!);

            setImage(imageData);
            setUser(userData);
            setRelatedImages(related);
        };

        unsubscribe();
    }, []);

    return (
        <div className="px-80 py-8 gap-8 flex flex-col">
            <div className="flex gap-4 justify-between w-full">
                <div>
                    <h1 className="font-bold text-2xl">
                        {convertLowerCaseToPascalCase(image?.title!)}
                    </h1>
                    <p className="text-sm">{image?.description}</p>
                    <p>{`Category: ${
                        CATEGORIES[image?.category! as keyof typeof CATEGORIES]
                    }`}</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-0 items-end">
                        <p className="opacity-50 text-sm">Created by</p>
                        <p>{user?.displayName || "Anonymous User"}</p>
                    </div>
                    <Avatar>
                        <AvatarImage src={user?.photoUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="w-[40%] self-center">
                <NextImage
                    src={BUCKET! + image?.filename}
                    alt={"Photo of " + image?.title}
                    priority
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: "100%",
                        height: "auto",
                        marginBottom: 16,
                    }}
                />
            </div>
            <div>
                <h1 className="text-3xl font-bold">Related Images</h1>
                <ImagesGrid images={relatedImages} />
            </div>
        </div>
    );
};

export default ImagePage;
