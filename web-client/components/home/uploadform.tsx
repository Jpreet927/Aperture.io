"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white/10 backdrop-blur-lg flex justify-center items-center overflow-hidden overscroll-none">
            <div className="flex flex-col gap-4 p-12 shadow-2xl w-[450px] rounded-xl bg-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Upload an Image</h1>
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
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
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
                                        <Input {...field} />
                                    </FormControl>
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
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UploadForm;
