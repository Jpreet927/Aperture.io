"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SignInButton from "./signin";
import UploadButton from "./upload";
import { onAuthStateChangedHelper } from "@/lib/firebase/firebase";
import { User } from "firebase/auth";
import Image from "next/image";
import logo from "@/assets/branding/logo-black.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    });

    return (
        <nav className="flex items-center justify-between px-64 py-6 gap-12 bg-gray-50">
            <div className="flex justify-start items-center gap-4">
                <Image
                    src={logo}
                    alt="Aperture.io Logo"
                    className="h-[25px] w-auto"
                />
                <h3 className="text-2xl font-extrabold">APERTURE.IO</h3>
            </div>
            <ul className="flex gap-16 justify-center">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/">Search</Link>
                </li>
            </ul>
            <div className="flex justify-end gap-16">
                <div className="h-[40px] w-[1px] bg-gray-500"></div>
                {user && <UploadButton />}
                <div className="flex gap-4">
                    {user && (
                        <Avatar>
                            <AvatarImage src={user.photoURL!} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    )}
                    <SignInButton user={user} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
