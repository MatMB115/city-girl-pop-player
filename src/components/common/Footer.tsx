export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-20 px-4 py-1 text-sm text-white bg-black/30 backdrop-blur-md border-t border-white/10">
            <div className="max-w-5xl mx-auto flex flex-row items-center justify-between gap-2">
                <span>© {new Date().getFullYear()} CityPopGirl.</span>
                <span>
                    Dev with 🩵 by{" "}
                    <a href="https://maysu.xyz/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Maysu
                    </a>
                </span>
            </div>
        </footer>
    );
}
