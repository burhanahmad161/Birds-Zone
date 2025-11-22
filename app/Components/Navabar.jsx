"use client";
import { useState } from "react";
import Logo from "../../Assets/logo.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // You can install `lucide-react` or use any other icon lib
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const router = useRouter();


    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                {/* Flex column on small screens, row on md+ */}
                <div className="flex flex-row justify-between md:flex-row md:items-center md:justify-between gap-4">

                    {/* Logo */}
                    <div className="flex justify-center md:justify-start">
                        <a href="/">
                            <Image
                                src={Logo}
                                alt="Birds Zone Logo"
                                width={140}
                                height={140}
                                className="w-32 h-auto md:w-36 lg:w-40"
                            />
                        </a>
                    </div>

                    {/* Right side links */}
                    <div className="flex flex-col  justify-center sm:flex-row items-center gap-4 sm:gap-6">
                        <a
                            href="/"
                            className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium transition"
                        >
                            <HomeIcon fontSize="small" />
                            Home
                        </a>

                        <a
                            href="/AddBird"
                            className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-md whitespace-nowrap"
                        >
                            Sell Your Bird
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
