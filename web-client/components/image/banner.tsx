import React from "react";
import NextImage from "next/image";
import { Image } from "@/ts/types/Image";

const UserBanner = ({ image }: { image: Image }) => {
    const BUCKET = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET;
    return (
        <div className="h-[300px] w-full relative overflow-hidden">
            <NextImage
                src={BUCKET! + image?.filename}
                alt={"Blurred image of" + image?.title}
                fill={true}
                objectFit="cover"
                className="blur-lg scale-110 object-center opacity-50"
            />
        </div>
    );
};

export default UserBanner;
