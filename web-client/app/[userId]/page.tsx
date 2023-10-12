"use client";

import React, { useState, useEffect } from "react";
import { getUserData, getImagesByUserId } from "@/lib/firebase/firebase";
import { User } from "@/ts/types/User";
import { Image } from "@/ts/types/Image";
import ImagesGrid from "@/components/image/imagegrid";
import UserAvatar from "@/components/image/avatar";
import UserBanner from "@/components/image/banner";
import UserSkeleton from "@/components/image/userskeleton";

const UserPage = ({ params }: { params: { userId: string } }) => {
    const [user, setUser] = useState<User>();
    const [images, setImages] = useState<Image[]>([]);

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
        <div className="flex flex-col items-center min-h-screen">
            {user ? (
                <>
                    <div className="w-full relative">
                        <UserBanner image={images[0]} />
                        <div className="flex w-full h-full justify-center items-center gap-8 absolute top-0 left-0">
                            <UserAvatar user={user!} dimensions={32} />
                            <div>
                                <h1 className="sm:text-4xl text-2xl font-bold">
                                    {user?.displayName || "Placeholder"}
                                </h1>
                                <p className="sm:text-md text-sm text-muted-foreground">
                                    Photographer on Aperture.io
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 xl:px-80 lg:px-48 px-12 py-16">
                        <div className="flex gap-4 items-center">
                            <h1 className="font-bold">{`${user?.displayName}'s Creations`}</h1>
                            <div className="h-[25px] w-[1px] bg-primary-foreground"></div>
                            <p className="text-muted-foreground">
                                {images.length > 1
                                    ? `${images.length} Photos`
                                    : "1 Photo"}
                            </p>
                        </div>
                        <div className="w-full bg-primary-foreground h-[1px]"></div>
                        <ImagesGrid images={images} />
                    </div>
                </>
            ) : (
                <UserSkeleton />
            )}
        </div>
    );
};

export default UserPage;
