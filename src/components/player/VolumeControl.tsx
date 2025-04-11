import { SpeakerHigh, SpeakerLow, SpeakerNone } from '@phosphor-icons/react';

interface VolumeControlProps {
    volume: number;
    currentColor: string;
    onVolumeChange: (volume: number) => void;
    onToggleMute: () => void;
}

export const VolumeControl = ({
    volume,
    currentColor,
    onVolumeChange,
    onToggleMute,
}: VolumeControlProps) => {
    const getVolumeIcon = () => {
        if (volume === 0) return <SpeakerNone size={24} weight="fill" />;
        if (volume > 0 && volume <= 0.5) return <SpeakerLow size={24} weight="fill" />;
        return <SpeakerHigh size={24} weight="fill" />;
    };

    return (
        <div className="absolute bottom-16 right-6 z-20 flex items-center gap-2 bg-black/50 text-white px-4 py-2 rounded-full text-sm w-[240px]">
            <span className="cursor-pointer" onClick={onToggleMute}>{getVolumeIcon()}</span>
            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-40"
                style={{ accentColor: currentColor }}
            />
            <span className="min-w-[3ch] text-right">{Math.round(volume * 100)}%</span>
        </div>
    );
}; 