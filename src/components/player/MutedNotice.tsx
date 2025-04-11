interface MutedNoticeProps {
    show: boolean;
    volume: number;
    onToggleMute: () => void;
}

export const MutedNotice = ({ show, volume, onToggleMute }: MutedNoticeProps) => {
    if (!show || volume !== 0) return null;

    return (
        <div
            className="absolute bottom-28 right-6 z-30 text-white text-sm bg-black/70 px-3 py-2 rounded-full animate-bounce cursor-pointer"
            onClick={onToggleMute}
        >
            👇🏼 Enable sound 🔇
        </div>
    );
}; 