import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { playlist } from "@/constants/videos";
import { NavButton } from "@/components/common/NavButton";

interface VideoNavButtonProps {
    currentVideoIndex: number;
    onVideoChange: (index: number) => void;
    currentColor: string;
}

export const VideoNavButton = ({
    currentVideoIndex,
    onVideoChange,
    currentColor,
}: VideoNavButtonProps) => {
    const handlePrevious = () => {
        const newIndex = currentVideoIndex === 0 ? playlist.length - 1 : currentVideoIndex - 1;
        onVideoChange(newIndex);
    };

    const handleNext = () => {
        const newIndex = (currentVideoIndex + 1) % playlist.length;
        onVideoChange(newIndex);
    };

    return (
        <>
            {/* mid screen */}
            <div className="hidden md:block">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                    <NavButton
                        onClick={handlePrevious}
                        icon={CaretLeft}
                        rotateDirection="left"
                        color={currentColor}
                    />
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                    <NavButton
                        onClick={handleNext}
                        icon={CaretRight}
                        rotateDirection="right"
                        color={currentColor}
                    />
                </div>
            </div>

            {/* small screen*/}
            <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+15vh)] z-20 flex justify-center items-center gap-4 md:hidden">
                <NavButton
                    onClick={handlePrevious}
                    icon={CaretLeft}
                    rotateDirection="left"
                    color={currentColor}
                />
                <NavButton
                    onClick={handleNext}
                    icon={CaretRight}
                    rotateDirection="right"
                    color={currentColor}
                />
            </div>
        </>
    );
};