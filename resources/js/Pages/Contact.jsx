import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    MessageCircle, 
    Phone, 
    Mail, 
    MapPin, 
    Clock, 
    ChevronDown, 
    HelpCircle
} from 'lucide-react';

const InstagramIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

export default function Contact({ faqs, mapsEmbed }) {
    const { site } = usePage().props;
    const [openFaq, setOpenFaq] = useState(0);

    const waNumber = site?.whatsapp_number || '6281234567890';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent('Halo Beach Camp, saya ingin tanya info reservasi & lokasi.')}`;

    return (
        <PublicLayout>
            <Head title="Kontak & FAQ — Beach Camp" />

            {/* Header Banner */}
            <section className="bg-[#231A12] text-white pt-36 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E37434_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-brand-primary/20 text-brand-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
                        Bantuan & Lokasi
                    </span>
                    <h1 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
                        Kontak, Lokasi & Pertanyaan
                    </h1>
                    <p className="text-base sm:text-lg text-[#F6F3C2]/85 max-w-2xl mx-auto leading-relaxed">
                        Punya pertanyaan seputar cara booking, akses jalan, atau fasilitas? Kami siap membantu Anda.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {/* Card 1: WhatsApp */}
                        <div className="bg-white p-7 rounded-3xl border border-brand-secondary shadow-sm text-center">
                            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-lg text-brand-text mb-1">
                                Chat WhatsApp
                            </h3>
                            <p className="text-xs text-brand-text-muted mb-4">
                                Respon cepat untuk booking & info
                            </p>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                            >
                                Chat Sekarang
                            </a>
                        </div>

                        {/* Card 2: Email */}
                        <div className="bg-white p-7 rounded-3xl border border-brand-secondary shadow-sm text-center">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-lg text-brand-text mb-1">
                                Email Resmi
                            </h3>
                            <p className="text-xs text-brand-text-muted mb-4">
                                Untuk penawaran kerja sama/grup
                            </p>
                            <a
                                href={`mailto:${site?.contact_email || 'halo@beachcamp.id'}`}
                                className="text-sm font-semibold text-brand-primary hover:underline"
                            >
                                {site?.contact_email || 'halo@beachcamp.id'}
                            </a>
                        </div>

                        {/* Card 3: Jam Operasional */}
                        <div className="bg-white p-7 rounded-3xl border border-brand-secondary shadow-sm text-center">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-lg text-brand-text mb-1">
                                Waktu Operasional
                            </h3>
                            <p className="text-xs text-brand-text-muted">
                                Check-in: 14.00 WIB
                            </p>
                            <p className="text-xs text-brand-text-muted">
                                Check-out: 12.00 WIB
                            </p>
                            <span className="text-xs font-semibold text-brand-success mt-2 inline-block">
                                Buka Setiap Hari
                            </span>
                        </div>

                        {/* Card 4: Instagram */}
                        <div className="bg-white p-7 rounded-3xl border border-brand-secondary shadow-sm text-center">
                            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4">
                                <InstagramIcon className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-lg text-brand-text mb-1">
                                Media Sosial
                            </h3>
                            <p className="text-xs text-brand-text-muted mb-4">
                                Update foto harian & promo
                            </p>
                            <a
                                href={`https://instagram.com/${(site?.instagram_handle || 'beachcamp.id').replace('@', '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-semibold text-pink-600 hover:underline"
                            >
                                {site?.instagram_handle || '@beachcamp.id'}
                            </a>
                        </div>
                    </div>

                    {/* FAQ & Maps Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* FAQ Accordions */}
                        <div>
                            <div className="mb-6 md:mb-8">
                                <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
                                    Pertanyaan Umum
                                </span>
                                <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-text mt-1">
                                    Frequently Asked Questions (FAQ)
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {faqs.map((faq, index) => {
                                    const isOpen = openFaq === index;
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-2xl border border-brand-secondary overflow-hidden transition-all"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setOpenFaq(isOpen ? null : index)}
                                                className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-base text-brand-text focus:outline-none"
                                            >
                                                <span>{faq.question}</span>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-brand-primary transition-transform duration-200 shrink-0 ${
                                                        isOpen ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="px-5 pb-5 pt-1 text-sm text-brand-text-muted leading-relaxed border-t border-brand-secondary/40">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="bg-white p-6 rounded-3xl border border-brand-secondary shadow-sm space-y-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-brand-primary" />
                                <h3 className="font-display font-bold text-xl text-brand-text">
                                    Lokasi & Peta Petunjuk Arah
                                </h3>
                            </div>
                            <p className="text-sm text-brand-text-muted">
                                {site?.address || 'Kawasan Pesisir Pantai Indah, Jalur Lintas Selatan KM 12, Jawa Timur'}
                            </p>

                            <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-brand-secondary bg-gray-100">
                                <iframe
                                    src={mapsEmbed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.28383884!2d110.3!3d-8.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDAnMDAuMCJTIDExMMKwMTgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid'}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Peta Lokasi Beach Camp"
                                />
                            </div>

                            <p className="text-xs text-brand-text-muted italic">
                                *Akses jalan beraspal halus dan dapat dilalui sepeda motor, mobil keluarga, maupun minibus rombongan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
