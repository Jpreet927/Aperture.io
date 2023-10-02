"use client";

import React, { useState, useEffect } from "react";
import {
    getUserData,
    getImageData,
    getImagesByUserId,
} from "@/lib/firebase/firebase";
import { User } from "@/ts/types/User";
import { Image } from "@/ts/types/Image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImagesGrid from "@/components/home/imagesgrid";
import UserAvatar from "@/components/image/avatar";

const UserPage = ({ params }: { params: { userId: string } }) => {
    const [user, setUser] = useState<User>();
    const [images, setImages] = useState<Image[]>([]);
    const BUCKET = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET;

    useEffect(() => {
        const unsubscribe = async () => {
            const getUser = getUserData(params.userId);
            const getUserImages = getImagesByUserId(params.userId);

            const [userData, userImages] = await Promise.all([
                getUser,
                getUserImages,
            ]);

            setUser(userData);
            setImages(userImages);
        };

        unsubscribe();
    }, []);

    return (
        <div className="px-80 py-16 flex flex-col gap-16 items-center">
            <div className="flex gap-8 items-center">
                <UserAvatar user={user!} dimensions={32} />
                <div>
                    <h1 className="text-4xl font-bold">
                        {user?.displayName || "Placeholder"}
                    </h1>
                    <p className="text-muted-foreground">
                        Photographer on Aperture.io
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex gap-2 items-center">
                    <h1 className="font-bold">{`${user?.displayName}'s Creations`}</h1>
                    <span>•</span>
                    <p>
                        {images.length > 1
                            ? `${images.length} Photos`
                            : "1 Photo"}
                    </p>
                </div>
                <div className="w-full bg-primary-foreground h-[1px]"></div>
                <ImagesGrid images={images} />
            </div>
        </div>
    );
};

export default UserPage;
