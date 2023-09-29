import Hero from "@/components/home/hero";
import ImagesGrid from "@/components/home/imagesgrid";
import UploadForm from "@/components/home/uploadform";
import Image from "next/image";

export default function Home() {
    return (
        <main className="">
            <Hero />
            <div className="px-80 py-16 flex flex-col gap-8">
                <h3 className="text-4xl font-bold">Recent Images</h3>
                <ImagesGrid />
            </div>
        </main>
    );
}
