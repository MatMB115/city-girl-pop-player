import { IconProps } from "@phosphor-icons/react";

interface NavButtonProps {
    onClick: () => void;
    icon: React.ComponentType<IconProps>;
    rotateDirection?: "left" | "right";
    color: string;
    disabled?: boolean;
}

export const NavButton = ({
    onClick,
    icon: Icon,
    rotateDirection,
    color,
    disabled = false,
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
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            aria-disabled={disabled}
            className={`bg-black/50 text-white p-3 rounded-full transition-all duration-300 group ${disabled ? "opacity-50 cursor-not-allowed" : `hover:bg-black/70 hover:scale-110 cursor-pointer ${rotateClass}`}`}
            style={buttonStyle}
        >
            <Icon
                size={32}
                weight="fill"
                className={`transition-transform duration-300 ${disabled ? "" : "group-hover:scale-110"}`}
            />
        </button>
    );
};
