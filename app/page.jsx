"use client";
// "use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import HomeIcon from "@mui/icons-material/Home";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Logo from "../Assets/logo.png";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navabar";

dayjs.extend(relativeTime);

export default function BirdsForSale() {
    const [birds, setBirds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Search input state

    useEffect(() => {
        const fetchBirds = async () => {
            try {
                const response = await fetch("/api/birds");
                if (!response.ok) throw new Error("Failed to load birds");
                const data = await response.json();
                const approvedBirds = data
                    .filter((bird) => bird.approvalStatus === "Approved")
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBirds(approvedBirds);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBirds();
    }, []);

    // Filter birds based on search query
    const filteredBirds = useMemo(() => {
        if (!searchQuery.trim()) return birds;

        const query = searchQuery.toLowerCase().trim();

        return birds.filter((bird) => {
            const species = bird.species?.toLowerCase() || "";
            const city = bird.city?.toLowerCase() || "";
            const gender = bird.gender?.toLowerCase() || "";
            const ageRange = bird.ageRange?.toLowerCase() || "";
            const description = bird.description?.toLowerCase() || "";
            const price = bird.price?.toString();

            return (
                species.includes(query) ||
                city.includes(query) ||
                gender.includes(query) ||
                ageRange.includes(query) ||
                description.includes(query) ||
                price.includes(query.replace(/,/g, ""))
            );
        });
    }, [birds, searchQuery]);

    const displayBirds = searchQuery ? filteredBirds : birds;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-green-50">
                <div className="w-20 h-20 border-8 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center py-20 text-red-600 text-2xl font-bold">Error: {error}</p>;
    }

    return (
        <>
            <Navbar />

            {/* Hero with WORKING Search */}
            <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-yellow-300 rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        Pakistan's #1 Bird Marketplace
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-green-100">
                        Buy & Sell Lovebirds, Cockatiels, Macaws, Finches & More
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by breed, city, price, gender..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-100 px-14 py-4 rounded-full text-gray-800 text-lg outline-none focus:ring-4 focus:ring-green-300 transition"
                            />
                            <SearchIcon className="absolute left-5 top-5 text-gray-500" fontSize="large" />
                            {/* Clear button */}
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-5 text-gray-500 hover:text-gray-700"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Live Search Results Count */}
                    {searchQuery && (
                        <p className="mt-6 text-lg text-green-100 animate-fadeIn">
                            Found <strong>{filteredBirds.length}</strong> bird{filteredBirds.length !== 1 ? "s" : ""} for "
                            <span className="underline">{searchQuery}</span>"
                        </p>
                    )}
                </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white py-6 border-b">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                        <VerifiedUserIcon style={{ fontSize: 40, color: "#10b981" }} />
                        <p className="mt-2 font-semibold text-gray-700">100% Verified Sellers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <LocalOfferIcon style={{ fontSize: 40, color: "#f59e0b" }} />
                        <p className="mt-2 font-semibold text-gray-700">Best Prices in Pakistan</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <AutoAwesomeIcon style={{ fontSize: 40, color: "#8b5cf6" }} />
                        <p className="mt-2 font-semibold text-gray-700">New Birds Daily</p>
                    </div>
                </div>
            </div>

            {/* Birds Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-20 mt-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
                        {searchQuery ? `Search Results` : `Latest Birds for Sale`}
                    </h2>
                    <p className="text-xl text-gray-600">
                        {displayBirds.length} beautiful bird{displayBirds.length !== 1 ? "s" : ""} available across Pakistan
                    </p>
                </div>

                {displayBirds.length === 0 ? (
                    <div className="text-center py-24 bg-gray-50 rounded-3xl">
                        <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 border-2 border-dashed rounded-full" />
                        <p className="text-3xl font-bold text-gray-600">
                            {searchQuery ? `No birds found for "${searchQuery}"` : "No birds available right now"}
                        </p>
                        <p className="text-gray-500 mt-3 text-lg">
                            {searchQuery ? "Try different keywords like 'lovebird', 'karachi', 'pair'" : "Check back soon — new birds added every day!"}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="mt-6 px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {displayBirds.map((bird) => (
                            <BirdCard key={bird.birdId} bird={bird} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

// BirdCard remains the same (but fix WhatsApp number!)
function BirdCard({ bird }) {
    const router = useRouter();
    const formatPrice = (price) =>
        new Intl.NumberFormat("en-PK", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 0,
        }).format(price);

    const timeAgo = dayjs(bird.createdAt).fromNow();

    return (
        <div
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
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {bird.isBreeder === "Yes" && (
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                            Proven Breeder
                        </span>
                    )}
                    {bird.gender === "Pair" && (
                        <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                            Bonded Pair
                        </span>
                    )}
                </div>
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
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {bird.age}
                    </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                    {bird.description || "Healthy, active and hand-tamed bird ready for a loving home"}
                </p>
                <div className="flex items-center gap-4 text-sm justify-between">
                    <span className="font-semibold text-gray-700">{bird.gender}</span>
                    <span className="text-gray-500">{bird.clutches} Clutches</span>

                    <span className="text-gray-500"> {bird.city || "Pakistan"}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <p className="text-2xl font-extrabold text-green-600">{formatPrice(bird.price)}</p>
                    <a
                        href={`https://wa.me/${92}${bird.whatsapp.replace(/[^0-9]/g, "")}`} // Clean number
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition shadow-lg"
                    >
                        <WhatsAppIcon style={{ color: "white", fontSize: "28px" }} />
                    </a>
                </div>
            </div>
        </div>
    );
}