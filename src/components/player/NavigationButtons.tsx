import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { playlist } from "@/constants/videos";

interface NavigationButtonsProps {
    currentVideoIndex: number;
    onVideoChange: (index: number) => void;
    currentColor: string;
}

export const NavigationButtons = ({
    currentVideoIndex,
    onVideoChange,
    currentColor,
}: NavigationButtonsProps) => {
    const handlePrevious = () => {
        const newIndex = currentVideoIndex === 0 ? playlist.length - 1 : currentVideoIndex - 1;
        onVideoChange(newIndex);
    };

    const handleNext = () => {
        const newIndex = (currentVideoIndex + 1) % playlist.length;
        onVideoChange(newIndex);
    };

    // Common style for buttons
    const buttonStyle = {
        boxShadow: `0 0 15px 4px ${currentColor}, 0 0 30px 8px ${currentColor}33`,
    };

    // Common class for buttons
    const buttonClassName = "bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 group cursor-pointer";

    // Reusable button component
    const NavButton = ({
        onClick,
        icon,
        rotate,
        className = ""
    }: {
        onClick: () => void;
        icon: React.ReactNode;
        rotate: string;
        className?: string;
    }) => (
        <button
            onClick={onClick}
            className={`${buttonClassName} ${rotate} ${className}`}
            style={buttonStyle}
        >
            {icon}
        </button>
    );

    return (
        <>
            {/* Botões para telas médias e maiores */}
            <div className="hidden md:block">
                <NavButton
                    onClick={handlePrevious}
                    icon={<CaretLeft size={32} weight="fill" className="transition-transform duration-300 group-hover:scale-110" />}
                    rotate="hover:rotate-[-5deg]"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
                />
                <NavButton
                    onClick={handleNext}
                    icon={<CaretRight size={32} weight="fill" className="transition-transform duration-300 group-hover:scale-110" />}
                    rotate="hover:rotate-[5deg]"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
                />
            </div>

            {/* Botões para telas menores */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+15vh)] z-20 flex justify-center items-center gap-4 md:hidden">
                <NavButton
                    onClick={handlePrevious}
                    icon={<CaretLeft size={32} weight="fill" className="transition-transform duration-300 group-hover:scale-110" />}
                    rotate="hover:rotate-[-5deg]"
                />
                <NavButton
                    onClick={handleNext}
                    icon={<CaretRight size={32} weight="fill" className="transition-transform duration-300 group-hover:scale-110" />}
                    rotate="hover:rotate-[5deg]"
                />
            </div>
        </>
    );
}; 