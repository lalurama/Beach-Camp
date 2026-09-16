import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import BeachCampLogo from '@/Components/BeachCampLogo';
import { 
    Menu, 
    X, 
    MessageCircle, 
    CalendarCheck, 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    ChevronRight,
    Compass
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

export default function PublicLayout({ children, transparentNav = false }) {
    const { site, flash, url } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: route('home'), active: route().current('home') },
        { name: 'Paket Camping', href: route('packages.index'), active: route().current('packages.*') },
        { name: 'Galeri', href: route('gallery.index'), active: route().current('gallery.*') },
        { name: 'Tentang Kami', href: route('about'), active: route().current('about') },
        { name: 'Kontak & FAQ', href: route('contact'), active: route().current('contact') },
        { name: 'Cek Reservasi', href: route('booking.check'), active: route().current('booking.check') },
    ];

    const waNumber = site?.whatsapp_number || '6281234567890';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent('Halo Beach Camp, saya ingin tanya info reservasi tempat camping pantai.')}`;

    // Nav appearance classes
    const isSolid = !transparentNav || scrolled;

    return (
        <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text font-sans antialiased selection:bg-brand-primary selection:text-white">
            {/* Flash Notifications */}
            {flash?.success && (
                <div className="fixed top-20 right-5 z-50 max-w-md bg-white border-l-4 border-brand-success shadow-xl rounded-lg p-4 flex items-start gap-3 transition-all animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0 mt-0.5" />
                    <div className="text-sm font-medium text-brand-text">
                        {flash.success}
                    </div>
                </div>
            )}
            {flash?.error && (
                <div className="fixed top-20 right-5 z-50 max-w-md bg-white border-l-4 border-brand-error shadow-xl rounded-lg p-4 flex items-start gap-3 transition-all animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-brand-error shrink-0 mt-0.5" />
                    <div className="text-sm font-medium text-brand-text">
                        {flash.error}
                    </div>
                </div>
            )}

            {/* Top Navigation */}
            <header 
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    isSolid 
                        ? 'bg-brand-bg/95 backdrop-blur-md shadow-sm border-b border-brand-secondary/50 py-3.5' 
                        : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href={route('home')} className="focus:outline-none">
                        <BeachCampLogo 
                            textColor={isSolid ? 'text-brand-text' : 'text-white'} 
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-7">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${
                                    link.active
                                        ? 'text-brand-primary font-semibold'
                                        : isSolid
                                            ? 'text-brand-text hover:text-brand-primary'
                                            : 'text-white/90 hover:text-white'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href={route('booking.create')}
                            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            <CalendarCheck className="w-4 h-4" />
                            <span>Booking Sekarang</span>
                        </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${
                            isSolid ? 'text-brand-text hover:bg-brand-secondary/40' : 'text-white hover:bg-white/10'
                        }`}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-brand-bg border-b border-brand-secondary/60 shadow-xl px-4 pt-3 pb-6 space-y-2 mt-3 animate-fade-in">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                                    link.active 
                                        ? 'bg-brand-primary text-white font-semibold' 
                                        : 'text-brand-text hover:bg-brand-secondary/30'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-3">
                            <Link
                                href={route('booking.create')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-semibold py-3 rounded-xl shadow"
                            >
                                <CalendarCheck className="w-5 h-5" />
                                <span>Booking Sekarang</span>
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Page Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#231A12] text-[#E7DFD5] pt-16 pb-10 border-t border-brand-primary/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        {/* Col 1: Brand Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2.5">
                                <BeachCampLogo textColor="text-white" />
                            </div>
                            <p className="text-sm text-[#B3A495] leading-relaxed">
                                Tempat wisata sewa area camping tepi pantai dengan suasana hangat, natural, dan ramah keluarga. Nikmati sensasi tidur beratap bintang dan matahari terbenam yang memukau.
                            </p>
                            <div className="pt-2 flex items-center gap-3">
                                <a 
                                    href={`https://instagram.com/${(site?.instagram_handle || 'beachcamp.id').replace('@', '')}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary flex items-center justify-center text-white transition-colors"
                                    aria-label="Instagram"
                                >
                                    <InstagramIcon className="w-4 h-4" />
                                </a>
                                <a 
                                    href={waUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary flex items-center justify-center text-white transition-colors"
                                    aria-label="WhatsApp"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Col 2: Navigation Links */}
                        <div>
                            <h3 className="text-white font-display font-semibold text-base mb-4 tracking-wide uppercase">
                                Menu Navigasi
                            </h3>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link href={route('home')} className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-brand-primary" /> Beranda
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('packages.index')} className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-brand-primary" /> Paket & Harga
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('gallery.index')} className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-brand-primary" /> Galeri Foto
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('about')} className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-brand-primary" /> Tentang Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('contact')} className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-brand-primary" /> Kontak & Lokasi
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('booking.check')} className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-brand-primary" /> Cek Status Reservasi
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Operational & Rules */}
                        <div>
                            <h3 className="text-white font-display font-semibold text-base mb-4 tracking-wide uppercase">
                                Informasi Camping
                            </h3>
                            <ul className="space-y-3 text-sm text-[#B3A495]">
                                <li className="flex items-start gap-2.5">
                                    <Clock className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-white block font-medium">Jam Operasional:</strong>
                                        {site?.operating_hours || 'Check-in: 14.00 WIB | Check-out: 12.00 WIB'}
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Compass className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-white block font-medium">Fasilitas Utama:</strong>
                                        Tenda bersih, toilet & shower air tawar, terminal listrik, area api unggun bersama, keamanan 24 jam.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Col 4: Contact & Address */}
                        <div>
                            <h3 className="text-white font-display font-semibold text-base mb-4 tracking-wide uppercase">
                                Hubungi Kami
                            </h3>
                            <ul className="space-y-3 text-sm text-[#B3A495]">
                                <li className="flex items-start gap-2.5">
                                    <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                                    <span>{site?.address || 'Kawasan Pesisir Pantai Indah, Jawa Timur'}</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                                    <a href={waUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                        +{waNumber}
                                    </a>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                                    <a href={`mailto:${site?.contact_email || 'halo@beachcamp.id'}`} className="hover:text-white transition-colors">
                                        {site?.contact_email || 'halo@beachcamp.id'}
                                    </a>
                                </li>
                            </ul>
                            <div className="mt-4 pt-2">
                                <Link
                                    href={route('login')}
                                    className="text-xs text-[#8A7B6E] hover:text-white transition-colors underline"
                                >
                                    Login Admin / Pengelola
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7B6E]">
                        <p>© {new Date().getFullYear()} {site?.site_name || 'Beach Camp'}. Hak Cipta Dilindungi.</p>
                        <p className="flex items-center gap-1">
                            Didesain dengan nuansa pesisir pantai yang hangat & natural.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Quick Action Button */}
            <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group focus:outline-none"
                aria-label="Chat WhatsApp"
            >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span className="hidden sm:inline font-semibold text-sm">
                    Tanya Reservasi
                </span>
            </a>
        </div>
    );
}
