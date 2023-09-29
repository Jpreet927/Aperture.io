import React from "react";
import logo from "@/assets/branding/logo-white.png";
import Image from "next/image";

const Hero = () => {
    return (
        <div className="w-full h-[650px] bg-black text-white flex justify-center items-center bg-hero object-cover bg-center">
            <div className="w-[30%] flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={logo}
                        alt="Aperture.io Logo"
                        className="h-[40px] w-auto"
                    />
                    <h1 className="text-4xl font-bold">
                        Welcome to Aperture.io
                    </h1>
                </div>
                <p>
                    Unleash Your Creative Lens: Where Photographers Connect,
                    Capture Moments, and Share Stories in Pixels.
                </p>
            </div>
        </div>
    );
};

export default Hero;
