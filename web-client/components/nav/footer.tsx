import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="xl:px-80 lg:px-32 md:px-16 px-8 py-12 flex justify-between sm:flex-row flex-col gap-6 bg-white dark:bg-background border-t border-black/10 dark:border-white/10">
            <div className="sm:w-[50%] w-full flex flex-col gap-1">
                <h3 className="text-3xl">
                    <b>APERTURE.IO</b>
                </h3>
                <p>© 2023 JAIPREET SINGH</p>
            </div>
            <div className="flex justify-between sm:w-[50%] w-full">
                <div className="flex flex-col gap-1.5 sm:w-auto w-[33%]">
                    <p className="mb-4">
                        <b>Built With</b>
                    </p>
                    <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                        Next.js
                    </p>
                    <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                        Express.js
                    </p>
                    <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                        Node.js
                    </p>
                    <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                        Google Cloud Platform
                    </p>
                    <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                        Tailwind
                    </p>
                </div>
                <div className="flex flex-col gap-1.5 sm:w-auto w-[33%]">
                    <p className="mb-4">
                        <b>Menu</b>
                    </p>
                    <Link
                        href="/"
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                    >
                        Home
                    </Link>
                    <Link
                        href="/portfolio/development"
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                    >
                        Development
                    </Link>
                    <Link
                        href="/portfolio/design"
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                    >
                        Design
                    </Link>
                    <Link
                        href="/portfolio/photography"
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                    >
                        Photography
                    </Link>
                    <Link
                        href="/about"
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                    >
                        About
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
