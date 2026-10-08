import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import BeachCampLogo from '@/Components/BeachCampLogo';
import { 
    LayoutDashboard, 
    CalendarCheck, 
    Package as PackageIcon, 
    Image as ImageIcon, 
    MessageSquare, 
    CalendarOff, 
    Settings, 
    LogOut, 
    ExternalLink, 
    Menu, 
    X, 
    CheckCircle2, 
    AlertCircle,
    User
} from 'lucide-react';

export default function AdminLayout({ children, header }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard, current: route().current('admin.dashboard') },
        { name: 'Kelola Reservasi', href: route('admin.bookings.index'), icon: CalendarCheck, current: route().current('admin.bookings.*') },
        { name: 'Paket Camping', href: route('admin.packages.index'), icon: PackageIcon, current: route().current('admin.packages.*') },
        { name: 'Galeri Foto', href: route('admin.galleries.index'), icon: ImageIcon, current: route().current('admin.galleries.*') },
        { name: 'Testimoni Tamu', href: route('admin.testimonials.index'), icon: MessageSquare, current: route().current('admin.testimonials.*') },
        { name: 'Blokir Tanggal', href: route('admin.blocked-dates.index'), icon: CalendarOff, current: route().current('admin.blocked-dates.*') },
        { name: 'Pengaturan Website', href: route('admin.settings.index'), icon: Settings, current: route().current('admin.settings.*') },
    ];

    return (
        <div className="min-h-screen bg-[#F7F4EC] text-brand-text flex">
            {/* Flash Notifications */}
            {flash?.success && (
                <div className="fixed top-5 right-5 z-50 max-w-md bg-white border-l-4 border-brand-success shadow-2xl rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-brand-text">{flash.success}</span>
                </div>
            )}
            {flash?.error && (
                <div className="fixed top-5 right-5 z-50 max-w-md bg-white border-l-4 border-brand-error shadow-2xl rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-brand-error shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-brand-text">{flash.error}</span>
                </div>
            )}

            {/* Mobile & Tablet Backdrop (<1024px) */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-64 bg-[#231A12] text-white flex flex-col justify-between transition-transform duration-300 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                <div>
                    {/* Brand Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <BeachCampLogo textColor="text-white" />
                        <button 
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-white/70 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="p-4 space-y-1.5">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                                        item.current
                                            ? 'bg-brand-primary text-white font-semibold shadow-md'
                                            : 'text-[#D0C3B5] hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom User Profile & Logout */}
                <div className="p-4 border-t border-white/10 space-y-3">
                    <Link
                        href={route('home')}
                        target="_blank"
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-brand-secondary hover:bg-white/10 transition-colors"
                    >
                        <span>Lihat Website Publik</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                                {auth.user?.name?.charAt(0) || 'A'}
                            </div>
                            <div className="truncate">
                                <span className="text-xs font-semibold text-white block truncate">
                                    {auth.user?.name || 'Admin'}
                                </span>
                                <span className="text-[10px] text-gray-400 block truncate">
                                    {auth.user?.email}
                                </span>
                            </div>
                        </div>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="p-2 text-gray-400 hover:text-brand-error transition-colors rounded-lg"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="bg-white border-b border-brand-secondary/60 px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-brand-text hover:bg-brand-secondary/40"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="font-display font-bold text-xl sm:text-2xl text-brand-text">
                            {header || 'Admin Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block text-xs font-semibold text-brand-success bg-green-50 px-3 py-1 rounded-full border border-green-200">
                            Mode Pengelola
                        </span>
                        <Link
                            href={route('home')}
                            target="_blank"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-primary-dark px-3 py-1.5 rounded-full border border-brand-primary/40 transition-colors"
                        >
                            <span>Lihat Web</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="p-4 sm:p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
