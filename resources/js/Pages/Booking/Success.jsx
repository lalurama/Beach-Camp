import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    CheckCircle2, 
    MessageCircle, 
    Calendar, 
    Users, 
    MapPin, 
    Printer, 
    ArrowRight,
    Home
} from 'lucide-react';

export default function Success({ booking, whatsappNumber }) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const waText = encodeURIComponent(
        `Halo Admin Beach Camp! Saya ingin konfirmasi booking:\n\n` +
        `• Kode Booking: ${booking.booking_code}\n` +
        `• Nama: ${booking.customer_name}\n` +
        `• Paket: ${booking.package?.name || 'Paket Camping'}\n` +
        `• Check-in: ${booking.check_in_date}\n` +
        `• Tamu: ${booking.guests_count} Orang\n` +
        `• Total: ${formatRupiah(booking.total_price)}\n\n` +
        `Mohon info instruksi pembayaran DP dan arahan lokasi. Terima kasih!`
    );

    const waUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;

    return (
        <PublicLayout>
            <Head title={`Reservasi Berhasil — ${booking.booking_code}`} />

            <section className="pt-32 pb-20 bg-brand-bg min-h-screen">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Card */}
                    <div className="bg-white rounded-3xl border border-brand-secondary shadow-xl overflow-hidden p-8 sm:p-10 text-center space-y-6">
                        {/* Icon */}
                        <div className="w-20 h-20 rounded-full bg-brand-success/15 text-brand-success flex items-center justify-center mx-auto ring-8 ring-brand-success/10">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <div>
                            <span className="text-xs uppercase font-bold tracking-widest text-brand-success bg-green-50 px-3 py-1 rounded-full inline-block mb-2">
                                Reservasi Berhasil Dibuat
                            </span>
                            <h1 className="font-display font-bold text-2xl sm:text-3xl text-brand-text">
                                Terima Kasih, {booking.customer_name}!
                            </h1>
                            <p className="text-sm text-brand-text-muted mt-2">
                                Permintaan reservasi Anda telah tercatat dalam sistem kami.
                            </p>
                        </div>

                        {/* Booking Code Box */}
                        <div className="p-5 rounded-2xl bg-[#FFFBF2] border-2 border-dashed border-brand-primary/60 text-center space-y-1">
                            <span className="text-xs uppercase tracking-wider text-brand-text-muted font-semibold block">
                                Kode Reservasi Anda
                            </span>
                            <span className="font-mono font-bold text-2xl sm:text-3xl text-brand-primary tracking-wider block">
                                {booking.booking_code}
                            </span>
                            <span className="text-[11px] text-brand-text-muted">
                                Simpan kode ini untuk mengecek status pemesanan kapan saja.
                            </span>
                        </div>

                        {/* Details Table */}
                        <div className="text-left bg-brand-bg p-5 rounded-2xl border border-brand-secondary space-y-2.5 text-sm">
                            <div className="flex justify-between text-brand-text-muted">
                                <span>Paket Camping:</span>
                                <strong className="text-brand-text">{booking.package?.name}</strong>
                            </div>
                            <div className="flex justify-between text-brand-text-muted">
                                <span>Jumlah Tamu:</span>
                                <span className="text-brand-text">{booking.guests_count} Orang</span>
                            </div>
                            <div className="flex justify-between text-brand-text-muted">
                                <span>Tanggal Check-in:</span>
                                <span className="text-brand-text">{booking.check_in_date} (Pukul 14.00 WIB)</span>
                            </div>
                            <div className="flex justify-between text-brand-text-muted">
                                <span>Tanggal Check-out:</span>
                                <span className="text-brand-text">{booking.check_out_date} (Pukul 12.00 WIB)</span>
                            </div>
                            <div className="pt-2 border-t border-brand-secondary/80 flex justify-between items-baseline">
                                <span className="font-bold text-brand-text">Total Biaya:</span>
                                <span className="font-display font-bold text-xl text-brand-primary">
                                    {formatRupiah(booking.total_price)}
                                </span>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-brand-primary/20 text-xs text-brand-text-muted text-left space-y-1.5">
                            <strong className="text-brand-text block font-semibold">Langkah Berikutnya:</strong>
                            <p>
                                1. Klik tombol hijau WhatsApp di bawah untuk konfirmasi pesanan ke Admin Beach Camp.
                            </p>
                            <p>
                                2. Admin kami akan mengirimkan detail rekening DP serta petunjuk arah menuju lokasi.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-2">
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-base py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5"
                            >
                                <MessageCircle className="w-5 h-5 fill-current" />
                                <span>Konfirmasi ke WhatsApp Admin</span>
                            </a>

                            <div className="flex items-center justify-center gap-4 pt-2">
                                <Link
                                    href={route('booking.check', { code: booking.booking_code })}
                                    className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1"
                                >
                                    <span>Cek Status Reservasi</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>

                                <span className="text-gray-300">•</span>

                                <Link
                                    href={route('home')}
                                    className="text-xs font-semibold text-brand-text-muted hover:text-brand-text flex items-center gap-1"
                                >
                                    <Home className="w-3.5 h-3.5" />
                                    <span>Kembali ke Beranda</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
