"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "../../../Assets/logo.png"; // adjust path if needed
import Footer from "../../Components/Footer";
import LoveBird from "../../../Assets/lovebird.jpg";
import CockatielImg from "../../../Assets/cockatiel.jpg";
import MacawImg from "../../../Assets/macaw.jpg";
import BudgieImg from "../../../Assets/budgie.jpg";
import AfricanGreyImg from "../../../Assets/african-grey.jpg";
import FinchImg from "../../../Assets/finch.jpg";
import SunConureImg from "../../../Assets/sun-conures.jpg";
dayjs.extend(relativeTime);

// Category icons & titles (you can add more)
const categoryData = {
    lovebirds: {
        title: "Lovebirds for Sale in Pakistan",
        icon: LoveBird,
    },
    cockatiels: {
        title: "Cockatiels for Sale in Pakistan",
        icon: CockatielImg,
    },
    macaws: {
        title: "Macaws – Large & Colorful Parrots",
        icon: MacawImg,
    },
    budgies: {
        title: "Budgies (Parakeets) for Sale",
        icon: BudgieImg,
    },
    "african-grey": {
        title: "African Grey Parrots",
        icon: AfricanGreyImg,
    },
    finches: {
        title: "Beautiful Finches for Sale",
        icon: FinchImg,
    },
    "sun-conures": {
        title: "Sun Conures for Sale",
        icon: SunConureImg,
    },
    // Add more categories here...
};

export default function CategoryPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug || "";

    const [birds, setBirds] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryKey = slug.toLowerCase().replace(/_/g, "-"); // just in case

    const category = categoryData[categoryKey] || {
        title: `${slug.replace(/-/g, " ")} for Sale in Pakistan`.replace(/\b\w/g, l => l.toUpperCase()),
        icon: "/placeholder-bird.jpg", // fallback image in public folder
    };
    useEffect(() => {
        const fetchBirds = async () => {
            try {
                const res = await fetch("/api/birds");
                const allBirds = await res.json();

                const filtered = allBirds
                    .filter(
                        (bird) =>
                            bird.approvalStatus === "Approved" &&
                            bird.species?.toLowerCase().includes(slug.replace(/-/g, " ").toLowerCase())
                    )
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setBirds(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchBirds();
    }, [slug]);

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-PK", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 0,
        }).format(price);

    const timeAgo = (date) => dayjs(date).fromNow();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-green-50">
                <div className="w-20 h-20 border-8 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            {/* Navigation */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center">
                        <Image src={Logo} alt="Birds Zone" width={130} height={130} />
                    </a>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium"
                        >
                            <ArrowBackIcon /> Back to Home
                        </button>
                        <a
                            href="/AddBird"
                            className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition"
                        >
                            Sell Your Bird
                        </a>
                    </div>
                </div>
            </nav>

            {/* Category Hero */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl border-8 border-white/30">
                        <Image
                            src={category.icon}
                            alt={category.title}
                            width={128}
                            height={158}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">{category.title}</h1>
                    <p className="text-xl text-green-100">
                        {birds.length} {slug.replace(/-/g, " ")} available across Pakistan
                    </p>
                </div>
            </div>

            {/* Birds Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {birds.length === 0 ? (
                    <div className="text-center py-24 bg-gray-50 rounded-3xl">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">
                            No {slug.replace(/-/g, " ")} found right now
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            New birds are added every day — check back soon!
                        </p>
                        <a
                            href="/AddBird"
                            className="inline-block bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition text-lg"
                        >
                            + Sell Your {slug.replace(/-/g, " ")}
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {birds.map((bird) => (
                            <div
                                key={bird.id}
                                onClick={() => router.push(`/bird/${bird.id}`)}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100"
                            >
                                <div className="relative h-64 bg-gray-100">
                                    <Image
                                        src={bird.imageUrl || "/placeholder-bird.jpg"}
                                        alt={bird.species}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {bird.isBreeder === "Yes" && (
                                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                            Proven Breeder
                                        </span>
                                    )}
                                    {bird.gender === "Pair" && (
                                        <span className="absolute top-12 left-3 bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                            Bonded Pair
                                        </span>
                                    )}
                                    <div className="absolute bottom-3 right-3">
                                        <span
                                            className={`px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${bird.eyeColor === "Red" ? "bg-red-600" : "bg-black"
                                                }`}
                                        >
                                            {bird.eyeColor} Eyes
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-gray-800">{bird.species}</h3>
                                        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                                            {bird.age}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {bird.description || "Healthy and beautiful bird ready for a new home"}
                                    </p>

                                    <div className="flex items-center justify-between gap-3 text-sm text-gray-600">
                                        <span className="font-semibold">{bird.gender}</span>
                                        <span>{bird.clutches} Clutches</span>
                                        <span>{bird.city || "Pakistan"}</span>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <p className="text-2xl font-extrabold text-green-600">
                                            {formatPrice(bird.price)}
                                        </p>
                                        <a
                                            href={`https://wa.me/${92}${bird.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition shadow-lg"
                                        >
                                            <WhatsAppIcon style={{ color: "white", fontSize: 28 }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}