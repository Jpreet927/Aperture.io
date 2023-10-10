import React from "react";
import Image from "next/image";
import logo from "@/assets/branding/logo-white.png";

const Hero = () => {
    return (
        <div className="w-full h-[650px] bg-black text-white flex justify-center items-center bg-hero bg-cover bg-bottom">
            <div className="lg:w-[30%] md:w-[50%] w-[66%] flex flex-col gap-4">
                <div className="flex sm:flex-row flex-col sm:items-center items-start gap-4">
                    <Image
                        src={logo}
                        alt="Aperture.io Logo"
                        className="h-[40px] w-auto"
                    />
                    <h1 className="sm:text-5xl text-4xl font-bold">
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
