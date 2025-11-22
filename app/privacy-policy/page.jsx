"use client";

import Image from "next/image";
import Navbar from "../Components/Navabar";
import Footer from "../Components/Footer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function PrivacyPolicy() {
    return (
        <>
            {/* Navigation */}
            <Navbar />

            {/* Privacy Policy Content */}
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-16 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Privacy Policy</h1>
                        <p className="text-lg text-gray-600">
                            Your trust is our top priority. Learn how we protect your data.
                        </p>
                        <p className="text-sm text-gray-500 mt-6">
                            Last updated: November 20, 2025
                        </p>
                    </div>

                    <div className="space-y-10 text-gray-700 leading-relaxed">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">1. Introduction</h2>
                            <p>
                                Welcome to <strong>Birds Zone Pakistan</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://birdszone.pk" className="text-green-600 underline">birdszone.pk</a> or use our services.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">2. Information We Collect</h2>
                            <p>We may collect the following types of information:</p>
                            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                                <li><strong>Personal Information:</strong> Name, WhatsApp number, city, and any details you provide when selling or inquiring about a bird.</li>
                                <li><strong>Bird Listing Data:</strong> Species, gender, age, price, description, images, and breeder status.</li>
                                <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages, and referral source (automatically collected via analytics).</li>
                                <li><strong>Cookies:</strong> Small data files used to improve your experience (you can disable them in your browser).</li>
                            </ul>
                        </section>

                        {/* How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">3. How We Use Your Information</h2>
                            <p>We use your information to:</p>
                            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                                <li>Display bird listings and connect buyers with sellers.</li>
                                <li>Enable direct WhatsApp communication between users.</li>
                                <li>Moderate and approve listings to maintain quality and safety.</li>
                                <li>Improve website functionality and user experience.</li>
                                <li>Send occasional updates (only with your consent).</li>
                                <li>Comply with legal obligations.</li>
                            </ul>
                        </section>

                        {/* Sharing Your Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">4. Sharing Your Information</h2>
                            <p>We <strong>do not sell</strong> your personal information. We may share it with:</p>
                            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                                <li><strong>Buyers & Sellers:</strong> Your WhatsApp number and bird details are visible only to facilitate transactions.</li>
                                <li><strong>Service Providers:</strong> Hosting, analytics, and moderation tools (under strict confidentiality).</li>
                                <li><strong>Legal Authorities:</strong> Only if required by law.</li>
                            </ul>
                        </section>

                        {/* Data Security */}
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">5. Data Security</h2>
                            <p>
                                We use industry-standard encryption (HTTPS) and secure servers to protect your data. However, no method of transmission over the internet is 100% secure. We strive to use commercially acceptable means to protect your information but cannot guarantee absolute security.
                            </p>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">6. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                                <li>Access, update, or delete your personal information.</li>
                                <li>Request removal of your bird listing at any time.</li>
                                <li>Opt out of non-essential communications.</li>
                                <li>Contact us at <a href="mailto:support@birdszone.pk" className="text-green-600 underline">support@birdszone.pk</a> for any privacy concerns.</li>
                            </ul>
                        </section>

                        {/* Children's Privacy */}
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">7. Children's Privacy</h2>
                            <p>
                                Our services are not intended for individuals under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware of such data, we will delete it immediately.
                            </p>
                        </section>

                        {/* Changes to Policy */}
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">8. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review it periodically.
                            </p>
                        </section>

                        {/* Contact Us */}
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">9. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="mt-6 p-6 bg-green-50 rounded-2xl border-2 border-green-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <WhatsAppIcon className="text-green-600" />
                                    <a href="https://wa.me/923260341076" className="text-green-600 font-semibold">+92 326 0341076</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:support@birdszone.pk" className="text-green-600 font-semibold">support@birdszone.pk</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}