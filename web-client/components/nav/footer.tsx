import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <div className="xl:px-64 lg:px-32 md:px-16 px-8 py-12 flex justify-between sm:flex-row flex-col gap-6 bg-white border-t border-black/10">
            <div className="sm:w-[50%] w-full">
                <h3 className="text-2xl">
                    <b>© 2023 JAIPREET SINGH</b>
                </h3>
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
                        Tailwind
                    </p>
                    <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                        Framer Motion
                    </p>
                </div>
                <div className="flex flex-col gap-1.5 sm:w-auto w-[33%]">
                    <p className="mb-4">
                        <b>Connect</b>
                    </p>
                    <a
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                        href="https://twitter.com/Jpreet_"
                        target="_blank"
                    >
                        Twitter
                    </a>
                    <a
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                        href="https://www.instagram.com/jpreetcreate/"
                        target="_blank"
                    >
                        Instagram
                    </a>
                    <a
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                        href="https://www.linkedin.com/in/jaipreetsingh/"
                        target="_blank"
                    >
                        LinkedIn
                    </a>
                    <a
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                        href="https://www.behance.net/jaipreet"
                        target="_blank"
                    >
                        Behance
                    </a>
                    <a
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                        href="https://github.com/Jpreet927"
                        target="_blank"
                    >
                        Github
                    </a>
                    <a
                        className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                        href="https://unsplash.com/@jpreet"
                        target="_blank"
                    >
                        Unsplash
                    </a>
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
