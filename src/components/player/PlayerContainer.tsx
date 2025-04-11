import ReactPlayer from "react-player/youtube";
import { playlist } from "@/constants/videos";

interface PlayerContainerProps {
    currentVideoIndex: number;
    volume: number;
    currentColor: string;
    playerRef: React.RefObject<any>;
}

export const PlayerContainer = ({
    currentVideoIndex,
    volume,
    currentColor,
    playerRef,
}: PlayerContainerProps) => {
    return (
        <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div
                className={`w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-4`}
                style={{
                    borderColor: currentColor,
                    boxShadow: `0 0 15px 4px ${currentColor}, 0 0 30px 8px ${currentColor}33`,
                }}
            >
                <div className="w-full h-[102%] md:h-[100.5%] pointer-events-none">
                    <ReactPlayer
                        ref={playerRef}
                        url={playlist[currentVideoIndex].url}
                        playing
                        volume={volume}
                        controls={false}
                        width="100%"
                        height="100%"
                        config={{
                            playerVars: {
                                modestbranding: 1,
                                rel: 0,
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}; 