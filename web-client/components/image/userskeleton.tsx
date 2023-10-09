import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const UserSkeleton = () => {
    return (
        <div className="relative">
            <Skeleton className="w-[full] h-80" />
            <div className="flex w-full h-full justify-center items-center gap-8 absolute top-0 left-0">
                <div>
                    <Skeleton className="h-[80px] w-[80px] rounded-full" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                </div>
            </div>
        </div>
    );
};

export default UserSkeleton;
