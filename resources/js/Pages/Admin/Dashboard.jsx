import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    CalendarCheck, 
    Clock, 
    CheckCircle2, 
    Coins, 
    Package as PackageIcon, 
    CalendarOff, 
    ArrowRight,
    MessageSquare,
    Users
} from 'lucide-react';

export default function Dashboard({ stats, recentBookings, upcomingBlockedDates }) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <AdminLayout header="Ringkasan Operasional Beach Camp">
            <Head title="Admin Dashboard — Beach Camp" />

            <div className="space-y-8 max-w-7xl mx-auto">
                {/* 1. STATS METRICS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Stat 1: Pending */}
                    <div className="bg-white p-6 rounded-3xl border border-brand-secondary shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                                Menunggu Konfirmasi
                            </span>
                            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="font-display font-bold text-3xl text-amber-600">
                            {stats.pendingBookings}
                        </div>
                        <span className="text-xs text-brand-text-muted mt-1 block">
                            Perlu tindakan respon segera
                        </span>
                    </div>

                    {/* Stat 2: Confirmed */}
                    <div className="bg-white p-6 rounded-3xl border border-brand-secondary shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                                Reservasi Terkonfirmasi
                            </span>
                            <div className="w-10 h-10 rounded-2xl bg-green-50 text-brand-success flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="font-display font-bold text-3xl text-brand-success">
                            {stats.confirmedBookings}
                        </div>
                        <span className="text-xs text-brand-text-muted mt-1 block">
                            Dari total {stats.totalBookings} reservasi
                        </span>
                    </div>

                    {/* Stat 3: Total Revenue */}
                    <div className="bg-white p-6 rounded-3xl border border-brand-secondary shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                                Estimasi Pendapatan
                            </span>
                            <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                                <Coins className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="font-display font-bold text-2xl text-brand-primary truncate">
                            {formatRupiah(stats.totalRevenue)}
                        </div>
                        <span className="text-xs text-brand-text-muted mt-1 block">
                            Status confirmed & completed
                        </span>
                    </div>

                    {/* Stat 4: Active Packages */}
                    <div className="bg-white p-6 rounded-3xl border border-brand-secondary shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                                Paket Aktif
                            </span>
                            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center">
                                <PackageIcon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="font-display font-bold text-3xl text-brand-teal">
                            {stats.activePackages}
                        </div>
                        <span className="text-xs text-brand-text-muted mt-1 block">
                            Tampil di website publik
                        </span>
                    </div>
                </div>

                {/* 2. RECENT BOOKINGS & BLOCKED DATES */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Recent Bookings Table (2 cols) */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-brand-secondary shadow-sm overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="p-6 border-b border-brand-secondary flex items-center justify-between">
                                <h2 className="font-display font-bold text-lg text-brand-text">
                                    Reservasi Terbaru
                                </h2>
                                <Link
                                    href={route('admin.bookings.index')}
                                    className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1"
                                >
                                    <span>Lihat Semua</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#FFFBF2] text-xs font-bold uppercase tracking-wider text-brand-text-muted border-b border-brand-secondary">
                                        <tr>
                                            <th className="px-6 py-3.5">Kode & Tamu</th>
                                            <th className="px-6 py-3.5">Paket</th>
                                            <th className="px-6 py-3.5">Check-In</th>
                                            <th className="px-6 py-3.5">Total</th>
                                            <th className="px-6 py-3.5">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-secondary/60">
                                        {recentBookings.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-brand-text-muted">
                                                    Belum ada data reservasi.
                                                </td>
                                            </tr>
                                        ) : (
                                            recentBookings.map((b) => (
                                                <tr key={b.id} className="hover:bg-brand-bg/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono font-bold text-xs text-brand-primary block">
                                                            {b.booking_code}
                                                        </span>
                                                        <span className="font-semibold text-brand-text">
                                                            {b.customer_name}
                                                        </span>
                                                        <span className="text-xs text-brand-text-muted block">
                                                            {b.customer_phone}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-brand-text">
                                                        {b.package?.name || '-'}
                                                        <span className="text-[11px] text-brand-text-muted block">
                                                            {b.guests_count} Tamu
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-brand-text">
                                                        {b.check_in_date}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-bold text-brand-text">
                                                        {formatRupiah(b.total_price)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block ${
                                                            b.status === 'confirmed' 
                                                                ? 'bg-green-100 text-green-800'
                                                                : b.status === 'completed'
                                                                    ? 'bg-teal-100 text-teal-800'
                                                                    : b.status === 'cancelled'
                                                                        ? 'bg-red-100 text-red-800'
                                                                        : 'bg-amber-100 text-amber-800'
                                                        }`}>
                                                            {b.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="p-4 border-t border-brand-secondary bg-[#FFFBF2] text-center">
                            <Link
                                href={route('admin.bookings.index')}
                                className="text-xs font-semibold text-brand-primary hover:underline"
                            >
                                Buka Halaman Pengelolaan Reservasi →
                            </Link>
                        </div>
                    </div>

                    {/* Right: Blocked Dates & Actions (1 col) */}
                    <div className="space-y-6">
                        {/* Upcoming Blocked Dates */}
                        <div className="bg-white rounded-3xl border border-brand-secondary shadow-sm p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-display font-bold text-base text-brand-text flex items-center gap-2">
                                    <CalendarOff className="w-4 h-4 text-brand-error" />
                                    <span>Jadwal Blokir Tanggal</span>
                                </h3>
                                <Link
                                    href={route('admin.blocked-dates.index')}
                                    className="text-xs font-semibold text-brand-primary hover:underline"
                                >
                                    Kelola
                                </Link>
                            </div>

                            <p className="text-xs text-brand-text-muted">
                                Tanggal-tanggal berikut tidak dapat dipilih oleh calon tamu di website.
                            </p>

                            <div className="space-y-2.5">
                                {upcomingBlockedDates.length === 0 ? (
                                    <p className="text-xs text-brand-text-muted italic">
                                        Tidak ada tanggal yang diblokir saat ini.
                                    </p>
                                ) : (
                                    upcomingBlockedDates.map((d) => (
                                        <div key={d.id} className="p-3 rounded-2xl bg-brand-bg border border-brand-secondary flex items-center justify-between text-xs">
                                            <span className="font-semibold text-brand-text">
                                                {d.date}
                                            </span>
                                            <span className="text-brand-text-muted">
                                                {d.reason || 'Libur/Penuh'}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <Link
                                href={route('admin.blocked-dates.index')}
                                className="w-full inline-flex items-center justify-center gap-2 bg-brand-bg hover:bg-brand-secondary text-brand-text text-xs font-semibold py-2.5 rounded-xl border border-brand-secondary transition-colors"
                            >
                                <span>+ Tambah Blokir Tanggal</span>
                            </Link>
                        </div>

                        {/* Quick Shortcut Card */}
                        <div className="bg-brand-primary text-white rounded-3xl p-6 space-y-3 shadow-md">
                            <h3 className="font-display font-bold text-lg text-white">
                                Butuh Update Konten?
                            </h3>
                            <p className="text-xs text-brand-secondary/90 leading-relaxed">
                                Anda dapat memperbarui nomor WhatsApp, alamat, teks cerita, dan foto galeri kapan saja lewat menu pengaturan.
                            </p>
                            <Link
                                href={route('admin.settings.index')}
                                className="inline-block bg-white text-brand-text hover:bg-brand-secondary text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                            >
                                Buka Pengaturan Website
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
