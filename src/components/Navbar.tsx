'use client'
import { ThemeToggle } from "./ui/theme-toggle";



interface NavbarProps {
    name?: string;
}

export default function Navbar({ name }: NavbarProps) {
    return (
        <nav className="bg-background/40 backdrop-blur-xl border-b border-black/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">

                {name && (
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold">{name}</span>
                    </div>
                )}

                <ThemeToggle />
            </div>
        </nav>
    );
}