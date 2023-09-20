import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <nav className="flex justify-between px-48 py-12">
            <h3 className="text-2xl font-extrabold">APERTURE.IO</h3>
            <ul>
                <li>
                    <Link href="/home">Home</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
