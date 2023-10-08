import React from "react";
import { categoryToSelect } from "@/ts/constants/category";
import Link from "next/link";

const CategoriesBar = () => {
    const categories = Object.keys(categoryToSelect);

    return (
        <div className="flex border-y w-full border-border xl:px-80 lg:px-48 px-12">
            {categories.map((category, idx) => (
                <Link
                    href={`/categories/${
                        categoryToSelect[
                            category as keyof typeof categoryToSelect
                        ]
                    }`}
                    key={idx}
                    target="_blank"
                    className={`p-4 ${
                        idx === 0 || idx === categories.length - 1
                            ? "border-x"
                            : "border-l"
                    } border-border w-full flex items-center justify-center hover:bg-accent transition duration-300 group`}
                >
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition duration-300">
                        {category}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default CategoriesBar;
