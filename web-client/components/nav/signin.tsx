"use client";

import React from "react";
import { signInWithGoogle, signOut } from "@/lib/firebase/firebase";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";

type props = {
    user: User | null;
};

const SignInButton = ({ user }: props) => {
    return (
        <div className="flex gap-4">
            {user ? (
                <Button variant="secondary" onClick={signOut}>
                    Sign Out
                </Button>
            ) : (
                <Button variant="secondary" onClick={signInWithGoogle}>
                    Sign In
                </Button>
            )}
        </div>
    );
};

export default SignInButton;
