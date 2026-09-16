import React, { useState } from 'react';
import { Head, router, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    Search, 
    CalendarCheck, 
    CheckCircle2, 
    Clock, 
    XCircle, 
    MessageCircle,
    User,
    Calendar,
    Users
} from 'lucide-react';

export default function Check({ booking, searched, code }) {
    const { site } = usePage().props;
    const [inputCode, setInputCode] = useState(code || '');

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!inputCode.trim()) return;

        router.get(route('booking.check'), {
            code: inputCode.trim(),
        }, {
            preserveState: true,
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return {
                    label: 'Terkonfirmasi',
                    bg: 'bg-green-100 text-green-800 border-green-200',
                    icon: CheckCircle2,
                    description: 'Reservasi Anda telah terkonfirmasi. Tenda Anda siap menyambut kedatangan Anda di Beach Camp!',
                };
            case 'completed':
                return {
                    label: 'Selesai',
                    bg: 'bg-teal-100 text-teal-800 border-teal-200',
                    icon: CheckCircle2,
                    description: 'Masa menginap Anda telah selesai. Terima kasih telah memilih Beach Camp!',
                };
            case 'cancelled':
                return {
                    label: 'Dibatalkan',
                    bg: 'bg-red-100 text-red-800 border-red-200',
                    icon: XCircle,
                    description: 'Reservasi ini telah dibatalkan.',
                };
            default:
                return {
                    label: 'Menunggu Konfirmasi',
                    bg: 'bg-amber-100 text-amber-800 border-amber-200',
                    icon: Clock,
                    description: 'Reservasi Anda telah diterima dan sedang menunggu konfirmasi admin. Hubungi WhatsApp admin untuk mempercepat proses konfirmasi.',
                };
        }
    };

    const waNumber = site?.whatsapp_number || '6281234567890';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo Admin Beach Camp, saya ingin tanya status kode booking ${booking?.booking_code || inputCode}.`)}`;

    return (
        <PublicLayout>
            <Head title="Cek Status Reservasi — Beach Camp" />

            {/* Header Banner */}
            <section className="bg-[#231A12] text-white pt-36 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E37434_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-brand-primary/20 text-brand-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
                        Tracking Reservasi
                    </span>
                    <h1 className="font-display font-bold text-3xl sm:text-5xl text-white mb-3">
                        Cek Status Booking Anda
                    </h1>
                    <p className="text-sm sm:text-base text-[#F6F3C2]/85 max-w-xl mx-auto">
                        Masukkan kode reservasi yang Anda dapatkan saat melakukan booking (contoh: BC-20260917-ABCD).
                    </p>
                </div>
            </section>

            {/* Search Box & Result */}
            <section className="py-14 bg-brand-bg min-h-[60vh]">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="mb-10">
                        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-3xl border border-brand-secondary shadow-md">
                            <div className="relative flex-1 w-full">
                                <Search className="w-5 h-5 text-brand-text-muted absolute left-4 top-3.5" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Masukkan kode booking (misal: BC-2026...)"
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-none focus:ring-0 font-mono text-sm uppercase placeholder:normal-case"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm px-7 py-3 rounded-2xl transition-all shadow"
                            >
                                <span>Cari Reservasi</span>
                            </button>
                        </div>
                    </form>

                    {/* Result Display */}
                    {searched && !booking && (
                        <div className="bg-white rounded-3xl border border-brand-secondary p-8 text-center shadow-sm space-y-3">
                            <XCircle className="w-12 h-12 text-brand-error mx-auto opacity-70" />
                            <h2 className="font-display font-bold text-xl text-brand-text">
                                Data Reservasi Tidak Ditemukan
                            </h2>
                            <p className="text-sm text-brand-text-muted max-w-md mx-auto">
                                Mohon pastikan kode reservasi yang Anda masukkan sudah benar, atau hubungi admin jika Anda membutuhkan bantuan.
                            </p>
                            <div className="pt-2">
                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand-primary hover:underline"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Bantuan via WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    )}

                    {booking && (
                        <div className="bg-white rounded-3xl border border-brand-secondary shadow-lg overflow-hidden p-8 space-y-6">
                            {/* Status Header */}
                            {(() => {
                                const statusInfo = getStatusBadge(booking.status);
                                const Icon = statusInfo.icon;
                                return (
                                    <div className={`p-4 rounded-2xl border flex items-start gap-3 ${statusInfo.bg}`}>
                                        <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-sm uppercase tracking-wider block">
                                                Status: {statusInfo.label}
                                            </span>
                                            <p className="text-xs mt-0.5 leading-relaxed">
                                                {statusInfo.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Booking Info Grid */}
                            <div className="border-t border-b border-brand-secondary py-5 space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text-muted">Kode Booking:</span>
                                    <span className="font-mono font-bold text-brand-primary text-base">
                                        {booking.booking_code}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text-muted">Nama Pemesan:</span>
                                    <strong className="text-brand-text">{booking.customer_name}</strong>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text-muted">Paket Camping:</span>
                                    <strong className="text-brand-text">{booking.package?.name}</strong>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text-muted">Jumlah Tamu:</span>
                                    <span className="text-brand-text">{booking.guests_count} Orang ({booking.tents_count} Tenda)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text-muted">Check-in:</span>
                                    <span className="text-brand-text">{booking.check_in_date}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text-muted">Check-out:</span>
                                    <span className="text-brand-text">{booking.check_out_date}</span>
                                </div>
                                <div className="pt-2 border-t border-brand-secondary/70 flex justify-between items-baseline">
                                    <span className="font-bold text-brand-text">Total Biaya:</span>
                                    <span className="font-display font-bold text-xl text-brand-primary">
                                        {formatRupiah(booking.total_price)}
                                    </span>
                                </div>
                            </div>

                            {/* Contact Admin CTA */}
                            <div className="text-center pt-2">
                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all shadow"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Hubungi Admin terkait Booking Ini</span>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
