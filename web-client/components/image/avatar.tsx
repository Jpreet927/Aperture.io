import React from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/ts/types/User";

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
