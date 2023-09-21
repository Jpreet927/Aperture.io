"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SignInButton from "./signin";
import UploadButton from "./upload";
import { onAuthStateChangedHelper } from "@/lib/firebase/firebase";
import { User } from "firebase/auth";

const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    });

    return (
        <nav className="flex justify-between px-48 py-12">
            <h3 className="text-2xl font-extrabold">APERTURE.IO</h3>
            <ul>
                <li>
                    <Link href="/home">Home</Link>
                </li>
            </ul>
            {user && <UploadButton />}
            <SignInButton user={user} />
        </nav>
    );
};

export default Navbar;
