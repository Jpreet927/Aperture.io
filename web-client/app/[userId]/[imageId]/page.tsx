"use client";

import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import {
    getUserData,
    getImageData,
    getImagesByCategory,
} from "@/lib/firebase/firebase";
import { convertLowerCaseToPascalCase } from "@/lib/helpers";
import { User } from "@/ts/types/User";
import { Image } from "@/ts/types/Image";
import { selectToCategory } from "@/ts/constants/category";
import ImagesGrid from "@/components/image/imagegrid";
import UserAvatar from "@/components/image/avatar";
import { Badge } from "@/components/ui/badge";
import ImageSkeleton from "@/components/image/imageskeleton";

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
        <div className="xl:px-80 lg:px-48 px-12 py-8 gap-8 flex flex-col">
            {image ? (
                <>
                    <div className="flex gap-4 justify-between w-full">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-4 items-center">
                                <h1 className="font-bold sm:text-3xl text-2xl">
                                    {convertLowerCaseToPascalCase(
                                        image?.title!
                                    )}
                                </h1>
                                <div className="h-[30px] w-[1px] bg-primary-foreground"></div>
                                <Link
                                    href={`/categories/${image?.category}`}
                                    target="_blank"
                                >
                                    <Badge className="grow-0">{`${
                                        selectToCategory[
                                            image?.category! as keyof typeof selectToCategory
                                        ]
                                    }`}</Badge>
                                </Link>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {image?.description}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="sm:flex hidden flex-col gap-0 items-end sm:text-md text-sm">
                                <p className="text-muted-foreground text-sm">
                                    Created by
                                </p>
                                <p>{user?.displayName || "Anonymous User"}</p>
                            </div>
                            <UserAvatar user={user!} dimensions={10} />
                        </div>
                    </div>
                    <div className="lg:w-[40%] md:w-[50%] w-[75%] self-center">
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
                    <div className="flex flex-col gap-6">
                        <h1 className="text-xl font-bold">Related Images</h1>
                        <div className="w-full bg-primary-foreground h-[1px]"></div>
                        <ImagesGrid images={relatedImages} />
                    </div>{" "}
                </>
            ) : (
                <ImageSkeleton />
            )}
        </div>
    );
};

export default ImagePage;
