"use client";

import { cn } from "../app/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { useTheme } from '../app/functions/ThemeContext';
import reviews from '../../public/assets/data/ReviewData';
import Image from "next/image";

const firstRow = reviews.slice(0, reviews.length / 1);

const ReviewCard = ({
    profile,
    name,
    rating,
    body,
    doneimg,
}: {
    profile: string;
    name: string;
    rating: number;
    body: string;
    doneimg: string;
}) => {
    return (
        <figure
            className={cn(
                "relative flex flex-col justify-between max-w-xs md:max-w-md w-full cursor-pointer overflow-hidden rounded-xl border p-4 md:p-6",
            )}
        >
            <div>
                <div className="flex flex-row items-center gap-2">
                    <Image className="rounded-full" width="50" height="50" alt="" src={profile} />
                    <div className="flex flex-col">
                        <figcaption className="text-lg md:text-xl font-bold dark:text-white">
                            {name}
                        </figcaption>
                        <p className="text-sm md:text-md font-medium dark:text-white/40">{rating}/10</p>
                    </div>
                </div>
                <blockquote className="my-2 text-md md:text-lg">{body}</blockquote>
            </div>
            <div>
                <Image
                    src={doneimg}
                    alt={`${name} done`}
                    className="w-full h-auto rounded-md shadow-md aspect-video object-cover"
                    width={160}
                    height={90}
                />
            </div>
        </figure>
    );
};

export function Testimonial() {
    const { isDarkTheme } = useTheme();
    return (
        <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden bg-transparent">
            <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-10 font-Poppins text-center">
                Komentar
            </h1>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.name} {...review} />
                ))}
            </Marquee>
            <div className={`pointer-events-none absolute inset-y-0 left-0 w-2/12 bg-gradient-to-r ${isDarkTheme ? 'from-black' : 'from-white'}`}></div>
            <div className={`pointer-events-none absolute inset-y-0 right-0 w-3/12 bg-gradient-to-l ${isDarkTheme ? 'from-black' : 'from-white'}`}></div>
        </div>
    );
}
