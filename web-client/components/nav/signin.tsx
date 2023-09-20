"use client";

import React from "react";
import { signInWithGoogle, signOut } from "@/lib/firebase";
import { User } from "firebase/auth";

type props = {
    user: User | null;
};

const SignInButton = ({ user }: props) => {
    return (
        <div className="flex gap-4">
            {user ? (
                <button onClick={signOut}>Sign Out</button>
            ) : (
                <button onClick={signInWithGoogle}>Sign In</button>
            )}
        </div>
    );
};

export default SignInButton;
