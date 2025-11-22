"use client";
import { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../Assets/logo.png";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";


export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Image src={Logo} alt="Birds Zone Logo" width={60} height={60} className="rounded-lg" />
            <h3 className="text-2xl font-bold text-green-400">Birds Zone</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Pakistan's most trusted marketplace to buy and sell lovebirds, cockatiels, macaws, finches & exotic birds with verified sellers.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="https://wa.me/923260341076" target="_blank" rel="noopener noreferrer"
              className="bg-green-600 p-3 rounded-full hover:bg-green-500 transition transform hover:scale-110 shadow-xl">
              <WhatsAppIcon />
            </a>
            <a href="https://www.facebook.com/birdshubpk" target="_blank" rel="noopener noreferrer"
              className="bg-blue-600 p-3 rounded-full hover:bg-blue-500 transition transform hover:scale-110 shadow-xl">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/birdshubpk" target="_blank" rel="noopener noreferrer"
              className="bg-purple-600 p-3 rounded-full hover:bg-purple-500 transition transform hover:scale-110 shadow-xl">
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-green-400 mb-6">Quick Links</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="/" className="hover:text-green-400 transition">Home</a></li>
            <li><a href="/AddBird" className="hover:text-green-400 transition">Sell Your Bird</a></li>
            <li><a href="/privacy-policy" className="hover:text-green-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Popular Breeds */}
        <div>
          <h4 className="text-lg font-bold text-green-400 mb-6">Popular Breeds</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="/category/lovebirds" className="hover:text-green-400 transition">Lovebirds</a></li>
            <li><a href="/category/cockatiels" className="hover:text-green-400 transition">Cockatiels</a></li>
            <li><a href="/category/budgies" className="hover:text-green-400 transition">Budgies</a></li>
            <li><a href="/category/macaws" className="hover:text-green-400 transition">Macaws</a></li>
            <li><a href="/category/african-grey" className="hover:text-green-400 transition">African Grey</a></li>
            <li><a href="/category/sun-conures" className="hover:text-green-400 transition">Sun Conures</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold text-green-400 mb-6">Contact Us</h4>
          <div className="space-y-4 text-gray-400 text-sm">
            <div className="flex items-center gap-3">
              <WhatsAppIcon className="text-green-500" />
              <span>+92 326 0341076</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>support@birdszone.pk</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Lahore, Punjab, Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Birds Zone Pakistan. All rights reserved. Made with ❤️ for bird lovers</p>
        </div>
      </div>
    </footer>
  );
}
