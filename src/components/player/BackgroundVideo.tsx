import ReactPlayer from "react-player/youtube";
import { playlist } from "@/constants/videos";

interface BackgroundVideoProps {
    currentVideoIndex: number;
    startTimeInVideo: number;
}

export const BackgroundVideo = ({ currentVideoIndex, startTimeInVideo }: BackgroundVideoProps) => {
    return (
        <div className="absolute inset-0 z-0 scale-[3] sm:scale-[2] md:scale-[1.2] filter blur-[2px] md:blur-xs opacity-60">
            <ReactPlayer
                url={playlist[currentVideoIndex].url}
                playing
                muted
                width="100%"
                height="100%"
                config={{ playerVars: { start: startTimeInVideo } }}
            />
        </div>
    );
}; 