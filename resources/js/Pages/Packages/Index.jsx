import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    Users, 
    Check, 
    CalendarCheck, 
    ArrowRight, 
    HelpCircle, 
    Filter,
    Shield,
    Coffee
} from 'lucide-react';

export default function Index({ packages, filters }) {
    const [selectedFilter, setSelectedFilter] = useState(filters?.guests || '');

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const handleFilterChange = (guestCount) => {
        setSelectedFilter(guestCount);
        router.get(route('packages.index'), {
            guests: guestCount || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <PublicLayout>
            <Head title="Daftar Paket Camping & Harga — Beach Camp" />

            {/* Header Banner */}
            <section className="bg-[#231A12] text-white pt-36 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E37434_1px,transparent_1px)] [background-size:24px_24px]" />
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-brand-primary/20 text-brand-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
                        Pilihan Menginap
                    </span>
                    <h1 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
                        Paket Camping & Harga
                    </h1>
                    <p className="text-base sm:text-lg text-[#F6F3C2]/85 max-w-2xl mx-auto leading-relaxed">
                        Pilih paket camping tepi pantai yang paling pas untuk Anda, pasangan, keluarga, atau rombongan komunitas.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="bg-white border-b border-brand-secondary py-5 sticky top-16 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-text">
                        <Filter className="w-4 h-4 text-brand-primary" />
                        <span>Filter Jumlah Tamu:</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleFilterChange('')}
                            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                                selectedFilter === ''
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-brand-bg text-brand-text hover:bg-brand-secondary/50'
                            }`}
                        >
                            Semua Paket
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFilterChange('2')}
                            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                                selectedFilter === '2'
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-brand-bg text-brand-text hover:bg-brand-secondary/50'
                            }`}
                        >
                            1–2 Orang (Duo)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFilterChange('4')}
                            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                                selectedFilter === '4'
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-brand-bg text-brand-text hover:bg-brand-secondary/50'
                            }`}
                        >
                            3–5 Orang (Keluarga)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFilterChange('10')}
                            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                                selectedFilter === '10'
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-brand-bg text-brand-text hover:bg-brand-secondary/50'
                            }`}
                        >
                            6+ Orang (Grup Komunitas)
                        </button>
                    </div>
                </div>
            </div>

            {/* Packages Grid */}
            <section className="py-16 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {packages.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-brand-secondary p-8">
                            <p className="text-brand-text-muted text-base mb-4">
                                Tidak ditemukan paket yang sesuai dengan kriteria filter jumlah tamu.
                            </p>
                            <button
                                type="button"
                                onClick={() => handleFilterChange('')}
                                className="inline-flex items-center gap-2 bg-brand-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow"
                            >
                                Reset Filter
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className="bg-white rounded-3xl overflow-hidden border border-brand-secondary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                                >
                                    {/* Image & Badges */}
                                    <div className="relative h-60 overflow-hidden bg-gray-100">
                                        <img
                                            src={pkg.image_url || 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80'}
                                            alt={pkg.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {pkg.badge && (
                                            <div className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                                {pkg.badge}
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-brand-text text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                                            <Users className="w-3.5 h-3.5 text-brand-primary" />
                                            <span>Kapasitas: {pkg.capacity_min}–{pkg.capacity_max} Orang</span>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <Link href={route('packages.show', pkg.slug)}>
                                                <h3 className="font-display font-bold text-xl text-brand-text mb-2 group-hover:text-brand-primary transition-colors">
                                                    {pkg.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                                                {pkg.short_description || pkg.description}
                                            </p>

                                            {/* Inclusions */}
                                            <div className="mb-6">
                                                <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-3">
                                                    Fasilitas Termasuk:
                                                </h4>
                                                <div className="space-y-2">
                                                    {(pkg.features || []).map((feature, idx) => (
                                                        <div key={idx} className="flex items-start gap-2 text-xs text-brand-text">
                                                            <Check className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                                                            <span>{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pricing Block */}
                                        <div className="pt-6 border-t border-brand-secondary/80">
                                            <div className="flex items-baseline justify-between mb-4">
                                                <div>
                                                    <span className="text-[11px] text-brand-text-muted uppercase tracking-wider block">
                                                        Weekday (Senin–Kamis)
                                                    </span>
                                                    <span className="font-display font-bold text-lg text-brand-primary">
                                                        {formatRupiah(pkg.price_regular)}
                                                    </span>
                                                    <span className="text-xs text-brand-text-muted"> /malam</span>
                                                </div>
                                                {pkg.price_weekend && (
                                                    <div className="text-right">
                                                        <span className="text-[11px] text-brand-text-muted uppercase tracking-wider block">
                                                            Weekend (Jumat–Sabtu)
                                                        </span>
                                                        <span className="font-display font-semibold text-sm text-brand-text">
                                                            {formatRupiah(pkg.price_weekend)}
                                                        </span>
                                                        <span className="text-xs text-brand-text-muted"> /malam</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={route('packages.show', pkg.slug)}
                                                    className="flex-1 text-center bg-brand-bg hover:bg-brand-secondary text-brand-text border border-brand-secondary text-xs sm:text-sm font-semibold py-2.5 rounded-full transition-colors"
                                                >
                                                    Detail Paket
                                                </Link>
                                                <Link
                                                    href={route('booking.create', { package: pkg.slug })}
                                                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs sm:text-sm font-semibold py-2.5 rounded-full shadow transition-all"
                                                >
                                                    <CalendarCheck className="w-4 h-4" />
                                                    <span>Booking</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Need Custom Package / Questions? */}
                    <div className="mt-16 bg-white rounded-3xl border border-brand-secondary p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="font-display font-bold text-xl text-brand-text">
                                Butuh Paket Khusus Gathering atau Jumlah Tamu Lebih Banyak?
                            </h3>
                            <p className="text-sm text-brand-text-muted max-w-xl">
                                Hubungi admin kami via WhatsApp untuk penawaran khusus rombongan kantor, gathering komunitas, atau acara spesial di pesisir pantai.
                            </p>
                        </div>
                        <Link
                            href={route('contact')}
                            className="inline-flex items-center gap-2 bg-brand-secondary hover:bg-[#eae69d] text-brand-text font-semibold text-sm px-6 py-3 rounded-full transition-colors shadow-sm shrink-0"
                        >
                            <HelpCircle className="w-4 h-4 text-brand-primary" />
                            <span>Konsultasi dengan Kami</span>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
