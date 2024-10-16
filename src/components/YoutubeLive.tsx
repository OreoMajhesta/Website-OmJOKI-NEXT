import HeroVideoDialog from "@/components/ui/hero-video-dialog";


const videos = [
    'https://www.youtube.com/live/pJtBKQ-rnIs?feature=shared',
    'https://www.youtube.com/live/KwJJK2xilVQ?feature=shared',
    'https://www.youtube.com/live/7RcPpYjJeA8?feature=shared',
    'https://www.youtube.com/live/ZShmg3UzZZc?feature=shared',
    'https://www.youtube.com/live/GJlRtrH4F4A?feature=shared',
    'https://www.youtube.com/live/5mR9FggWIiM?feature=shared',
    'https://www.youtube.com/live/ZHZuId6Hdrw?feature=shared',
    'https://www.youtube.com/live/-S6ImxIia_A?feature=shared',
    'https://www.youtube.com/live/uDsCM36qMA0?feature=shared',
];

const YoutubeLive = () => {
    return (
        <section className="flex flex-col items-center justify-center py-20">
            <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-10 font-Poppins">
                Tutorial Videos
            </h1>
            <div className="relative w-full container h-[45rem] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {videos.map((link, index) => {
                        const cleanLink = link.split('?')[0];
                        const videoId = cleanLink.split('/').pop();
                        return (
                            <div key={index} className="w-full">
                                {videoId && (
                                    <HeroVideoDialog
                                        animationStyle="from-center"
                                        videoSrc={`https://www.youtube.com/embed/${videoId}`}
                                        thumbnailSrc={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`}
                                        thumbnailAlt={`Thumbnail of video ${videoId}`}
                                        title="Youtube Video"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default YoutubeLive;
