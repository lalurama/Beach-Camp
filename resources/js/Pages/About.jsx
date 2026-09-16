import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Heart, Compass, Shield, Sun, Sparkles, CalendarCheck } from 'lucide-react';

export default function About({ aboutTitle, aboutStory }) {
    return (
        <PublicLayout>
            <Head title="Tentang Kami — Beach Camp" />

            {/* Header Banner */}
            <section className="bg-[#231A12] text-white pt-36 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E37434_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-brand-primary/20 text-brand-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
                        Kisah & Nilai Kami
                    </span>
                    <h1 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
                        Tentang Beach Camp
                    </h1>
                    <p className="text-base sm:text-lg text-[#F6F3C2]/85 max-w-2xl mx-auto leading-relaxed">
                        Menghadirkan pengalaman camping pesisir pantai yang hangat, ramah, dan ramah keluarga.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
                                Cerita Kami
                            </span>
                            <h2 className="font-display font-bold text-2xl sm:text-4xl text-brand-text">
                                {aboutTitle || 'Kisah Dimulainya Beach Camp'}
                            </h2>
                            <p className="text-brand-text-muted leading-relaxed text-base whitespace-pre-line">
                                {aboutStory || `Beach Camp lahir dari kecintaan kami pada ketenangan pantai dan kebersamaan di alam terbuka. Kami ingin menghadirkan tempat berkemah di mana setiap orang—baik keluarga, sahabat, maupun pasangan—bisa menikmati keindahan alam pesisir tanpa harus repot membawa perlengkapan berat.

Dengan fasilitas higienis, keamanan terjamin, dan keramahan khas lokal, kami siap menyambut petualangan santai Anda.`}
                            </p>
                            <div className="pt-4 flex flex-wrap gap-4">
                                <Link
                                    href={route('packages.index')}
                                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm px-6 py-3 rounded-full shadow transition-all"
                                >
                                    <CalendarCheck className="w-4 h-4" />
                                    <span>Lihat Pilihan Paket</span>
                                </Link>
                                <Link
                                    href={route('contact')}
                                    className="inline-flex items-center gap-2 bg-white hover:bg-brand-secondary/50 text-brand-text border border-brand-secondary font-semibold text-sm px-6 py-3 rounded-full transition-all"
                                >
                                    <span>Hubungi Kami</span>
                                </Link>
                            </div>
                        </div>

                        {/* Image Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                                    alt="Pantai Beach Camp"
                                    className="rounded-3xl shadow-sm object-cover h-48 sm:h-64 w-full"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80"
                                    alt="Tenda Malam Hari"
                                    className="rounded-3xl shadow-sm object-cover h-40 sm:h-52 w-full"
                                />
                            </div>
                            <div className="space-y-4 pt-6 sm:pt-10">
                                <img
                                    src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=600&q=80"
                                    alt="Glamping Mewah"
                                    className="rounded-3xl shadow-sm object-cover h-40 sm:h-52 w-full"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1508873696983-2df5293cb39f?auto=format&fit=crop&w=600&q=80"
                                    alt="Api Unggun Bersama"
                                    className="rounded-3xl shadow-sm object-cover h-48 sm:h-64 w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-[#FBF7EE] border-t border-brand-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
                            Prinsip Utama
                        </span>
                        <h2 className="font-display font-bold text-2xl sm:text-4xl text-brand-text mt-2">
                            Komitmen Kami untuk Setiap Tamu
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-brand-secondary shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-brand-text mb-3">
                                Keramahan & Kenyamanan
                            </h3>
                            <p className="text-sm text-brand-text-muted leading-relaxed">
                                Kami melayani setiap tamu layaknya keluarga sendiri, memastikan tenda rapi, bersih, dan wangi sebelum kedatangan.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-brand-secondary shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-brand-text mb-3">
                                Keamanan Terjamin 24 Jam
                            </h3>
                            <p className="text-sm text-brand-text-muted leading-relaxed">
                                Tim operasional dan keamanan selalu bersiaga menjaga area camp agar Anda bisa tidur lelap tanpa kekhawatiran.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-brand-secondary shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                                <Sun className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-brand-text mb-3">
                                Kelestarian Alam Pesisir
                            </h3>
                            <p className="text-sm text-brand-text-muted leading-relaxed">
                                Kami berkomitmen menjaga kebersihan pantai, memilah sampah, dan mengedukasi wisatawan agar alam tetap indah.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
