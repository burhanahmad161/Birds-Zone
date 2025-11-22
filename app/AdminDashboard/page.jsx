"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function AdminAuctions() {
    const [birds, setBirds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingBirds();
    }, []);

    const fetchPendingBirds = async () => {
        try {
            const res = await fetch("/api/birds");
            const data = await res.json();

            // Only show birds that are NOT yet approved
            const pending = data
                .filter((bird) => bird.approvalStatus !== "Approved")
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setBirds(pending);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (birdId) => {
        if (!confirm("Are you sure you want to approve this bird listing?")) return;
        console.log("Approving bird ID:", birdId);

        try {
            const res = await fetch(`/api/birds/${birdId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ approvalStatus: "Approved" }),
            });

            if (res.ok) {
                setBirds((prev) => prev.filter((bird) => bird.birdId !== birdId));
                console.log("Bird approved:", birdId);
                alert("Bird approved & published successfully!");
            } else {
                alert("Failed to approve. Try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Error occurred");
        }
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-PK", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 0,
        }).format(price);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-green-50">
                <div className="w-16 h-16 border-8 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                        Admin Dashboard – Bird Approval
                    </h1>
                    <p className="text-xl text-gray-600">
                        {birds.length} pending bird(s) waiting for approval
                    </p>
                </div>

                {birds.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-xl">
                        <CheckCircleIcon style={{ fontSize: 80, color: "#10b981" }} />
                        <h2 className="text-3xl font-bold text-gray-800 mt-6">All Caught Up!</h2>
                        <p className="text-gray-600 mt-3 text-lg">No pending birds for approval</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {birds.map((bird) => (
                            <BirdApprovalCard
                                key={bird.id}
                                bird={bird}
                                onApprove={handleApprove}
                                formatPrice={formatPrice}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Beautiful Card Component for Each Pending Bird
function BirdApprovalCard({ bird, onApprove, formatPrice }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateTimer = () => {
            const created = dayjs(bird.createdAt);
            const diff = dayjs().diff(created);
            const duration = dayjs.duration(diff);

            if (diff > 24 * 60 * 60 * 1000) {
                setTimeLeft("More than 24 hours ago");
            } else {
                const hours = duration.hours();
                const minutes = duration.minutes();
                setTimeLeft(
                    hours > 0
                        ? `${hours}h ${minutes}m ago`
                        : `${minutes}m ago`
                );
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 30000); // Update every 30 sec
        return () => clearInterval(interval);
    }, [bird.createdAt]);

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-green-400 transition-all duration-300">
            {/* Image */}
            <div className="relative h-64 bg-gray-100">
                <Image
                    src={bird.imageUrl || "/placeholder-bird.jpg"}
                    alt={bird.species}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <PendingIcon fontSize="small" />
                        Pending
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{bird.species}</h3>
                    <p className="text-gray-600 mt-1">{bird.gender} • {bird.ageRange}</p>
                </div>

                <p className="text-gray-700 line-clamp-3">
                    {bird.description || "No description provided"}
                </p>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-3xl font-extrabold text-green-600">
                            {formatPrice(bird.price)}
                        </p>
                        <p className="text-sm text-gray-500">{bird.city || "Pakistan"}</p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-500">Submitted</p>
                        <p className="font-semibold text-gray-700">{timeLeft}</p>
                    </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-3">
                        <WhatsAppIcon className="text-green-600" />
                        <div>
                            <p className="text-sm font-medium">{bird.sellerName || "Anonymous"}</p>
                            <a
                                href={`https://wa.me/${bird.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-600 underline"
                            >
                                {bird.whatsapp}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={() => onApprove(bird.birdId)}
                        className="flex-1 bg-green-600 text-white py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2"
                    >
                        <CheckCircleIcon />
                        Approve & Publish
                    </button>
                    <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}