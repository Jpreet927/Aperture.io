import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="w-full overflow-hidden relative pb-36">
            <div className="xl:px-80 lg:px-32 md:px-16 px-8 py-12 flex justify-between sm:flex-row flex-col gap-8 bg-white dark:bg-background border-t border-black/10 dark:border-white/10 h-full">
                <div className="flex flex-col gap-1 justify-between h-full">
                    <h3 className="text-3xl">
                        <b>APERTURE.IO</b>
                    </h3>
                    <p className="text-muted-foreground">
                        © 2023 JAIPREET SINGH
                    </p>
                </div>
                <div className="flex justify-between md:flex-row flex-col md:gap-24 gap-8">
                    <div className="flex flex-col gap-1.5 sm:w-auto w-[50%]">
                        <p className="mb-4">
                            <b>Built With</b>
                        </p>
                        <div className="flex gap-16">
                            <div className="flex flex-col gap-1.5">
                                <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                                    Next.js
                                </p>
                                <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                                    Express.js
                                </p>
                                <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                                    Node.js
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                                    Google Cloud
                                </p>
                                <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                                    Firebase
                                </p>
                                <p className="opacity-75 hover:opacity-100 transition ease-in delay-400">
                                    TailwindCSS
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 sm:w-auto w-[50%]">
                        <p className="mb-4">
                            <b>Menu</b>
                        </p>
                        <div className="flex gap-16">
                            <div className="flex flex-col gap-1.5">
                                <Link
                                    href="/categories/architecture"
                                    className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                                >
                                    Architecture
                                </Link>
                                <Link
                                    href="/categories/currentevents"
                                    className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                                >
                                    Current Events
                                </Link>
                                <Link
                                    href="/categories/experimental"
                                    className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                                >
                                    Experimental
                                </Link>
                                <Link
                                    href="/categories/fashion"
                                    className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                                >
                                    Fashion
                                </Link>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Link
                                    href="/categories/nature"
                                    className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                                >
                                    Nature
                                </Link>
                                <Link
                                    href="/categories/people"
                                    className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                                >
                                    People
                                </Link>
                                <Link
                                    href="/categories/sports"
                                    className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                                >
                                    Sports
                                </Link>
                                <Link
                                    href="/categories/street"
                                    className="opacity-75 hover:opacity-100 transition ease-in delay-400"
                                >
                                    Street
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-[18vw] font-bold absolute bottom-0 left-0 translate-y-[50%] text-muted-foreground opacity-10">
                APERTURE
            </h1>
        </div>
    );
};

export default Footer;
