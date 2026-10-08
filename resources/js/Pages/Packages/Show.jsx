import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    Users, 
    Check, 
    CalendarCheck, 
    ArrowLeft, 
    Clock, 
    ShieldCheck, 
    Sparkles,
    ArrowRight
} from 'lucide-react';

export default function Show({ package: pkg, relatedPackages }) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <PublicLayout>
            <Head title={`${pkg.name} — Detail Paket Beach Camp`} />

            {/* Top Breadcrumb */}
            <div className="bg-[#231A12] text-white pt-28 pb-10 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href={route('packages.index')}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-secondary hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Semua Paket</span>
                    </Link>
                    <div className="flex flex-wrap items-center gap-3">
                        {pkg.badge && (
                            <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                {pkg.badge}
                            </span>
                        )}
                        <span className="bg-white/10 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-brand-secondary" />
                            Kapasitas {pkg.capacity_min}–{pkg.capacity_max} Orang
                        </span>
                    </div>
                    <h1 className="font-display font-bold text-3xl sm:text-5xl text-white mt-3">
                        {pkg.name}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-14 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Left: Photos & Description (2 cols on tablet & desktop) */}
                        <div className="md:col-span-2 space-y-6 md:space-y-8">
                            {/* Main Image */}
                            <div className="rounded-3xl overflow-hidden shadow-md border border-brand-secondary h-72 sm:h-96 md:h-[420px] bg-gray-100">
                                <img
                                    src={pkg.image_url || 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'}
                                    alt={pkg.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Description Box */}
                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-secondary shadow-sm space-y-4">
                                <h2 className="font-display font-bold text-xl md:text-2xl text-brand-text">
                                    Tentang Paket Ini
                                </h2>
                                <p className="text-brand-text-muted leading-relaxed text-sm md:text-base whitespace-pre-line">
                                    {pkg.description}
                                </p>
                            </div>

                            {/* Included Features */}
                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-secondary shadow-sm">
                                <h2 className="font-display font-bold text-xl md:text-2xl text-brand-text mb-6">
                                    Fasilitas & Perlengkapan yang Didapat
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
                                    {(pkg.features || []).map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-brand-bg border border-brand-secondary/60">
                                            <div className="w-6 h-6 rounded-full bg-brand-success/15 text-brand-success flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-xs sm:text-sm font-medium text-brand-text">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rules / Important Notes */}
                            <div className="bg-[#FFF8EE] p-6 rounded-3xl border border-brand-primary/20 space-y-3">
                                <h3 className="font-display font-semibold text-base text-brand-text flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-brand-primary" />
                                    <span>Informasi & Ketentuan Penting</span>
                                </h3>
                                <ul className="text-xs sm:text-sm text-brand-text-muted space-y-2 list-disc pl-5">
                                    <li>Check-in dimulai pukul 14.00 WIB dan check-out maksimal pukul 12.00 WIB.</li>
                                    <li>Dilarang membuang sampah sembarangan di bibir pantai demi kelestarian alam.</li>
                                    <li>Tersedia petugas keamanan dan pengawas pantai selama 24 jam.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right: Booking Summary Widget (1 col on tablet & desktop) */}
                        <div className="md:col-span-1">
                            <div className="bg-white p-6 md:p-7 rounded-3xl border-2 border-brand-primary shadow-xl md:sticky md:top-24 space-y-5 md:space-y-6">
                                <div>
                                    <span className="text-[11px] uppercase tracking-wider text-brand-text-muted font-semibold block">
                                        Harga Mulai Dari
                                    </span>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="font-display font-bold text-2xl lg:text-3xl text-brand-primary">
                                            {formatRupiah(pkg.price_regular)}
                                        </span>
                                        <span className="text-xs text-brand-text-muted">/ malam</span>
                                    </div>
                                </div>

                                {/* Rates Breakdown */}
                                <div className="p-4 rounded-2xl bg-brand-bg border border-brand-secondary space-y-2 text-xs">
                                    <div className="flex justify-between items-center text-brand-text">
                                        <span>Tarif Weekday</span>
                                        <span className="font-semibold">{formatRupiah(pkg.price_regular)}</span>
                                    </div>
                                    {pkg.price_weekend && (
                                        <div className="flex justify-between items-center text-brand-text">
                                            <span>Tarif Weekend</span>
                                            <span className="font-semibold">{formatRupiah(pkg.price_weekend)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Booking CTA */}
                                <Link
                                    href={route('booking.create', { package: pkg.slug })}
                                    className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold py-3.5 md:py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5"
                                >
                                    <CalendarCheck className="w-5 h-5" />
                                    <span>Pesan Paket Ini</span>
                                </Link>

                                <div className="text-center">
                                    <Link
                                        href={route('contact')}
                                        className="text-xs text-brand-primary font-medium hover:underline"
                                    >
                                        Punya pertanyaan? Hubungi kami
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Packages */}
                    {relatedPackages?.length > 0 && (
                        <div className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-brand-secondary">
                            <h3 className="font-display font-bold text-xl md:text-2xl text-brand-text mb-6 md:mb-8">
                                Paket Camping Lainnya
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {relatedPackages.map((rel) => (
                                    <Link
                                        key={rel.id}
                                        href={route('packages.show', rel.slug)}
                                        className="bg-white rounded-2xl p-5 border border-brand-secondary shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                                    >
                                        <div>
                                            <h4 className="font-display font-semibold text-base text-brand-text group-hover:text-brand-primary transition-colors">
                                                {rel.name}
                                            </h4>
                                            <span className="text-xs text-brand-primary font-bold">
                                                {formatRupiah(rel.price_regular)} /malam
                                            </span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-brand-text-muted group-hover:text-brand-primary transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
