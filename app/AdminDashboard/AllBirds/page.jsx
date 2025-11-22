"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";

dayjs.extend(relativeTime);

export default function AdminAllBirdsTable() {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllBirds();
  }, []);

  const fetchAllBirds = async () => {
    try {
      const res = await fetch("/api/birds");
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBirds(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-semibold">
            <CheckCircleIcon fontSize="small" /> Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full text-sm font-semibold">
            <PendingIcon fontSize="small" /> Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-sm font-semibold">
            <CancelIcon fontSize="small" /> Rejected
          </span>
        );
      default:
        return <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <div className="w-16 h-16 border-8 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
            All Bird Listings ({birds.length})
          </h1>
          <p className="text-xl text-gray-600">Complete overview of all submitted birds</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
                <tr>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Image</th>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Species</th>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Details</th>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Price</th>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Seller</th>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {birds.map((bird) => (
                  <tr key={bird.id} className="hover:bg-green-50 transition-colors">
                    {/* Image */}
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image
                          src={bird.imageUrl || "/placeholder-bird.jpg"}
                          alt={bird.species}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                    </td>

                    {/* Species */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-lg text-gray-800">{bird.species}</p>
                        <p className="text-sm text-gray-500">{bird.city || "Pakistan"}</p>
                      </div>
                    </td>

                    {/* Details */}
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      <p>{bird.gender}</p>
                      {bird.isBreeder === "Yes" && <span className="text-green-600 font-semibold">Proven Breeder</span>}
                      {bird.gender === "Pair" && <span className="text-purple-600 font-semibold">Bonded Pair</span>}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <p className="text-2xl font-extrabold text-green-600">
                        {formatPrice(bird.price)}
                      </p>
                    </td>

                    {/* Seller */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <WhatsAppIcon className="text-green-600" />
                        <div>
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
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(bird.approvalStatus || "Pending")}
                    </td>

                    {/* Age */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {bird.age}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {birds.length === 0 && (
          <div className="text-center py-24 bg-white rounded-2xl">
            <p className="text-2xl text-gray-600">No birds found in the database</p>
          </div>
        )}
      </div>
    </div>
  );
}