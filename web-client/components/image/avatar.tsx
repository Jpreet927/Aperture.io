import { User } from "@/ts/types/User";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const UserAvatar = ({
    user,
    dimensions,
}: {
    user: User;
    dimensions: number;
}) => {
    return (
        <Link href={`/${user?.uid!}`}>
            <Avatar className={`h-${dimensions} w-${dimensions}`}>
                <AvatarImage src={user?.photoUrl} />
                <AvatarFallback>IO</AvatarFallback>
            </Avatar>
        </Link>
    );
};

export default UserAvatar;
