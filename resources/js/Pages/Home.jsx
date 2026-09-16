import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    CalendarCheck, 
    Sparkles, 
    ShieldCheck, 
    Flame, 
    Waves, 
    Sunset, 
    Users, 
    Star, 
    ArrowRight, 
    Check, 
    HeartHandshake,
    Compass,
    Image as ImageIcon
} from 'lucide-react';

export default function Home({ popularPackages, galleries, testimonials, heroTitle, heroSubtitle, aboutStory }) {
    // Currency formatter
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <PublicLayout transparentNav={true}>
            <Head title="Beach Camp — Wisata Camping Pantai Hangat & Menyenangkan" />

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center text-center overflow-hidden">
                {/* Background Image with Warm Coastal Gradient Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000 ease-out"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231A12] via-black/45 to-black/60" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/90 text-white text-xs sm:text-sm font-semibold mb-6 shadow-lg backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-brand-secondary" />
                        <span>Pengalaman Liburan Pantai Tanpa Ribet</span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-6">
                        {heroTitle}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-xl text-[#F6F3C2]/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                        {heroSubtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={route('booking.create')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1"
                        >
                            <CalendarCheck className="w-5 h-5" />
                            <span>Booking Tenda Sekarang</span>
                        </Link>

                        <Link
                            href={route('packages.index')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-semibold text-base px-7 py-4 rounded-full transition-all duration-200"
                        >
                            <span>Lihat Semua Paket</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Trust Highlights */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/15 text-white/90 text-xs sm:text-sm">
                        <div className="flex items-center justify-center gap-2">
                            <Sunset className="w-5 h-5 text-brand-secondary" />
                            <span>View Sunset Langsung</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-brand-secondary" />
                            <span>Keamanan 24 Jam</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Flame className="w-5 h-5 text-brand-secondary" />
                            <span>Api Unggun Bersama</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Waves className="w-5 h-5 text-brand-secondary" />
                            <span>Toilet & Air Bersih</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. KENAPA PILIH BEACH CAMP (VALUE PROPOSITIONS) */}
            <section className="py-20 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
                            Keunggulan Kami
                        </span>
                        <h2 className="font-display font-bold text-2xl sm:text-4xl text-brand-text mt-2 mb-4">
                            Kenapa Harus Camping di Beach Camp?
                        </h2>
                        <p className="text-brand-text-muted text-base leading-relaxed">
                            Kami menggabungkan pesona alam pantai yang autentik dengan kenyamanan menginap terbaik untuk liburan Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-7 rounded-2xl border border-brand-secondary shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-5">
                                <Sunset className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-semibold text-lg text-brand-text mb-2">
                                Spot Sunset Terbaik
                            </h3>
                            <p className="text-sm text-brand-text-muted leading-relaxed">
                                Posisi tenda menghadap langsung ke barat, memberi panorama matahari terbenam spektakuler tanpa penghalang.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-7 rounded-2xl border border-brand-secondary shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-5">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-semibold text-lg text-brand-text mb-2">
                                Tenda Bersih Siap Pakai
                            </h3>
                            <p className="text-sm text-brand-text-muted leading-relaxed">
                                Datang tinggal rebahan. Tenda sudah terpasang rapi, matras wangi, dan perlengkapan tidur siap menyambut Anda.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-7 rounded-2xl border border-brand-secondary shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-5">
                                <Waves className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-semibold text-lg text-brand-text mb-2">
                                Fasilitas Lengkap & Higienis
                            </h3>
                            <p className="text-sm text-brand-text-muted leading-relaxed">
                                Tersedia kamar mandi bilas dengan air tawar bersih, colokan listrik pengisi daya, dan area parkir aman.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-7 rounded-2xl border border-brand-secondary shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-5">
                                <Flame className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-semibold text-lg text-brand-text mb-2">
                                Api Unggun & BBQ
                            </h3>
                            <p className="text-sm text-brand-text-muted leading-relaxed">
                                Malam hari semakin hangat dengan api unggun bersama, musik akustik santai, dan fasilitas pemanggang BBQ.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SHOWCASE PAKET POPULER */}
            <section className="py-20 bg-[#FBF7EE] border-y border-brand-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
                        <div>
                            <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
                                Pilihan Favorit
                            </span>
                            <h2 className="font-display font-bold text-2xl sm:text-4xl text-brand-text mt-2">
                                Paket Camping Populer
                            </h2>
                            <p className="text-brand-text-muted text-base mt-2 max-w-xl">
                                Temukan paket yang sesuai dengan jumlah tamu dan kebutuhan liburan pantai Anda.
                            </p>
                        </div>
                        <Link
                            href={route('packages.index')}
                            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-brand-primary font-semibold hover:text-brand-primary-dark transition-colors"
                        >
                            <span>Lihat Semua Paket</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {popularPackages.map((pkg) => (
                            <div 
                                key={pkg.id} 
                                className="bg-white rounded-3xl overflow-hidden border border-brand-secondary/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                            >
                                {/* Package Image & Badge */}
                                <div className="relative h-56 overflow-hidden bg-gray-100">
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
                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-brand-text text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5 text-brand-primary" />
                                        <span>{pkg.capacity_min}–{pkg.capacity_max} Orang</span>
                                    </div>
                                </div>

                                {/* Package Content */}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-display font-bold text-xl text-brand-text mb-2 group-hover:text-brand-primary transition-colors">
                                            {pkg.name}
                                        </h3>
                                        <p className="text-sm text-brand-text-muted leading-relaxed mb-5">
                                            {pkg.short_description || pkg.description}
                                        </p>

                                        {/* Features List */}
                                        <div className="space-y-2 mb-6">
                                            {(pkg.features || []).slice(0, 4).map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-xs text-brand-text">
                                                    <Check className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                            {(pkg.features || []).length > 4 && (
                                                <p className="text-xs text-brand-primary font-medium pl-6">
                                                    + {pkg.features.length - 4} fasilitas lainnya
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="pt-5 border-t border-brand-secondary/70 flex items-center justify-between">
                                        <div>
                                            <span className="text-[11px] uppercase tracking-wider text-brand-text-muted block">
                                                Mulai dari
                                            </span>
                                            <span className="font-display font-bold text-lg text-brand-primary">
                                                {formatRupiah(pkg.price_regular)}
                                            </span>
                                            <span className="text-xs text-brand-text-muted font-normal"> /malam</span>
                                        </div>
                                        <Link
                                            href={route('booking.create', { package: pkg.slug })}
                                            className="inline-flex items-center gap-1.5 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow transition-all duration-200"
                                        >
                                            <span>Pilih</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CUPLIKAN GALERI FOTO */}
            <section className="py-20 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
                                Potret Pantai
                            </span>
                            <h2 className="font-display font-bold text-2xl sm:text-4xl text-brand-text mt-2">
                                Suasana Hangat di Beach Camp
                            </h2>
                            <p className="text-brand-text-muted text-base mt-2">
                                Sekilas pemandangan dan momen seru para tamu kami saat berlibur.
                            </p>
                        </div>
                        <Link
                            href={route('gallery.index')}
                            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-brand-primary font-semibold hover:text-brand-primary-dark transition-colors"
                        >
                            <span>Buka Galeri Lengkap</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {galleries.slice(0, 6).map((item) => (
                            <div 
                                key={item.id} 
                                className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm bg-gray-200"
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. TESTIMONI PENGUNJUNG */}
            {testimonials.length > 0 && (
                <section className="py-20 bg-brand-secondary/30 border-t border-brand-secondary">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-brand-primary font-semibold text-sm tracking-wider uppercase">
                                Kata Pengunjung
                            </span>
                            <h2 className="font-display font-bold text-2xl sm:text-4xl text-brand-text mt-2 mb-4">
                                Cerita Pengalaman Menginap
                            </h2>
                            <p className="text-brand-text-muted text-base">
                                Ulasan jujur dari wisatawan yang telah menikmati liburan di Beach Camp.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.slice(0, 3).map((item) => (
                                <div 
                                    key={item.id} 
                                    className="bg-white p-7 rounded-3xl border border-brand-secondary shadow-sm flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Stars */}
                                        <div className="flex items-center gap-1 mb-4 text-brand-warning">
                                            {[...Array(item.rating || 5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-sm text-brand-text leading-relaxed italic mb-6">
                                            "{item.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-4 border-t border-brand-secondary/60">
                                        <img
                                            src={item.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                                            alt={item.customer_name}
                                            className="w-10 h-10 rounded-full object-cover border border-brand-secondary"
                                        />
                                        <div>
                                            <h4 className="font-display font-semibold text-sm text-brand-text">
                                                {item.customer_name}
                                            </h4>
                                            <span className="text-xs text-brand-text-muted block">
                                                {item.customer_origin || 'Wisatawan'} {item.stay_date ? `• ${item.stay_date}` : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 6. CALL TO ACTION BANNER */}
            <section className="py-20 bg-brand-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-brand-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
                        Reservasi Mudah & Cepat
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-6 leading-tight">
                        Siap Merasakan Hangatnya Senja di Tepi Pantai?
                    </h2>
                    <p className="text-base sm:text-lg text-brand-secondary/95 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Amankan kavling tenda favorit Anda sekarang sebelum kehabisan tanggal terbaik di akhir pekan!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={route('booking.create')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-brand-secondary text-brand-text font-semibold text-base px-9 py-4 rounded-full shadow-2xl transition-all duration-200 transform hover:-translate-y-1"
                        >
                            <CalendarCheck className="w-5 h-5 text-brand-primary" />
                            <span>Pesan Tempat Sekarang</span>
                        </Link>
                        <Link
                            href={route('contact')}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/20 hover:bg-black/30 text-white border border-white/30 font-semibold text-base px-7 py-4 rounded-full transition-all duration-200"
                        >
                            <span>Tanya Tanya Dulu</span>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
