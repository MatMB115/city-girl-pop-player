import { IconProps } from "@phosphor-icons/react";

interface NavButtonProps {
    onClick: () => void;
    icon: React.ComponentType<IconProps>;
    rotateDirection?: "left" | "right";
    color: string;
}

export const NavButton = ({
    onClick,
    icon: Icon,
    rotateDirection,
    color,
}: NavButtonProps) => {
    const rotateClass = rotateDirection === "left"
        ? "hover:rotate-[-5deg]"
        : rotateDirection === "right"
            ? "hover:rotate-[5deg]"
            : "";

    const buttonStyle = {
        boxShadow: `0 0 15px 4px ${color}, 0 0 30px 8px ${color}33`,
    };

    return (
        <button
            onClick={onClick}
            className={`bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 group cursor-pointer ${rotateClass}`}
            style={buttonStyle}
        >
            <Icon
                size={32}
                weight="fill"
                className="transition-transform duration-300 group-hover:scale-110"
            />
        </button>
    );
};