"use client";

import { uploadImage } from "@/lib/firebase/functions";
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const UploadButton = ({
    setFormVisible,
}: {
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);

        if (file) {
            handleUpload(file);
        }
    };

    const handleUpload = async (file: File) => {
        try {
            const response = await uploadImage(file);
            toast({
                title: "File uploaded successfully!",
                description: "Thanks for contributing to Aperture.io :)",
            });
            console.log(`File uploaded successfully`);
        } catch (error) {
            console.log(`Failed to upload file: ${error}`);
        }
    };

    return (
        <Button
            className="flex gap-4 items-center"
            onClick={() => setFormVisible(true)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
            </svg>
            Upload a Photo
        </Button>
    );
};

export default UploadButton;
