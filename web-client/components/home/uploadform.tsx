"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { uploadImage } from "@/lib/firebase/functions";
import { FormData } from "@/ts/types/FormData";

const formSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: "Title cannot be blank",
        })
        .max(50, {
            message: "Title is too long.",
        }),
    description: z
        .string()
        .min(1, { message: "Description cannot be blank." })
        .max(50, { message: "Description is too long." }),
    category: z.string().min(1, { message: "Please choose a category." }),
    file: z.any(),
});

const UploadForm = ({
    setFormVisible,
}: {
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            file: undefined,
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.item(0);

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (!file) return;

            setFormSubmitted(true);
            values.file = file;
            console.log(values);

            const response = await uploadImage(values as FormData);

            toast({
                title: "File uploaded successfully!",
                description: "Thanks for contributing to Aperture.io :)",
            });

            form.reset();
            setFile(undefined);
            setFormSubmitted(false);
            setFormVisible(false);
        } catch (error) {
            console.log(`Failed to upload file: ${error}`);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white/10 dark:bg-background/50 backdrop-blur-lg flex justify-center items-center overflow-hidden overscroll-none p-8 z-20">
            <div className="flex flex-col gap-4 sm:px-12 py-12 px-8 shadow-2xl w-[450px] rounded-xl bg-white dark:bg-background">
                <div className="flex justify-between items-center">
                    <h1 className="sm:text-2xl text-lg font-bold">
                        Upload an Image
                    </h1>
                    <Button
                        variant="ghost"
                        onClick={() => setFormVisible(false)}
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Button>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <fieldset disabled={formSubmitted ? true : false}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Category
                                                    </SelectLabel>
                                                    <SelectItem value="architecture">
                                                        Architecture
                                                    </SelectItem>
                                                    <SelectItem value="currentevents">
                                                        Current Events
                                                    </SelectItem>
                                                    <SelectItem value="experimental">
                                                        Experimental
                                                    </SelectItem>
                                                    <SelectItem value="fashion">
                                                        Fashion
                                                    </SelectItem>
                                                    <SelectItem value="nature">
                                                        Nature
                                                    </SelectItem>
                                                    <SelectItem value="people">
                                                        People
                                                    </SelectItem>
                                                    <SelectItem value="sports">
                                                        Sports
                                                    </SelectItem>
                                                    <SelectItem value="street">
                                                        Street
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <FormField
                                            control={form.control}
                                            name="file"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>File</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                handleFileChange(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="mt-6">
                                Submit
                            </Button>
                        </fieldset>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UploadForm;
