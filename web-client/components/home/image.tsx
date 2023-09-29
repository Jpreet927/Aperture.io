"use client";

import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image } from "@/ts/types/Image";
import { getUserData } from "@/lib/firebase/firebase";
import { User } from "@/ts/types/User";
import Link from "next/link";

const ApertureImage = ({ image }: { image: Image }) => {
    const BUCKET = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET;
    const [user, setUser] = useState<User | null>(null);

    console.log(user);
    useEffect(() => {
        const unsubscribe = async () => {
            const data = await getUserData(image.uid!);
            setUser(data);
        };

        unsubscribe();
    }, [image]);

    return (
        <Link href={`/${image.uid}/${image.id}`} target="_blank">
            <div className="relative group">
                <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/50 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full flex gap-4 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Avatar>
                        <AvatarImage src={user?.photoUrl} />
                        <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-white font-semibold">
                            {image?.title}
                        </p>
                        <p className="text-white/70 text-xs">
                            {image?.description}
                        </p>
                    </div>
                </div>
                <NextImage
                    src={BUCKET! + image.filename}
                    alt={"Photo of " + image.title}
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
        </Link>
    );
};

export default ApertureImage;
