import { GithubLogo, YoutubeLogo, InstagramLogo, SpotifyLogo } from '@phosphor-icons/react';

export const SocialLinks = () => {
    return (
        <>
            <a
                href="https://www.youtube.com/@CityPopGirl"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-16 sm:top-20 md:top-24 right-4 sm:right-6 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
                <YoutubeLogo size={24} weight="fill" />
            </a>
            <a
                href="https://github.com/MatMB115"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-32 sm:top-36 md:top-40 right-4 sm:right-6 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
                <GithubLogo size={24} weight="fill" />
            </a>
            <a
                href="https://www.instagram.com/official.citypopgirl/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-48 sm:top-52 md:top-56 right-4 sm:right-6 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
                <InstagramLogo size={24} weight="fill" />
            </a>
            <a
                href="https://open.spotify.com/artist/2H106ZDIzq2otoHBVVxbtv?si=vpdtmJYASASo3C5_cOW4gw"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-64 sm:top-68 md:top-72 right-4 sm:right-6 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
                <SpotifyLogo size={24} weight="fill" />
            </a>
        </>
    );
}; 