import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ImageSkeleton = () => {
    return (
        <div className="flex flex-col gap-8 items-center w-full">
            <div className="flex justify-between w-full">
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-8 w-[200px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-[50px] w-[50px] rounded-full" />
                </div>
            </div>
            <Skeleton className="h-[500px] w-[400px]" />
        </div>
    );
};

export default ImageSkeleton;
