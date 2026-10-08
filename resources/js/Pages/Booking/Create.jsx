import React, { useState, useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    CalendarCheck, 
    Users, 
    Check, 
    AlertCircle, 
    ArrowRight, 
    ArrowLeft, 
    Sparkles, 
    Calendar,
    Phone,
    Mail,
    User,
    FileText
} from 'lucide-react';

export default function Create({ packages, selectedPackage, blockedDates }) {
    const [step, setStep] = useState(1);

    // Initial checkin: tomorrow, checkout: 2 days after today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    const dayAfterStr = dayAfter.toISOString().split('T')[0];

    const { data, setData, post, processing, errors } = useForm({
        package_id: selectedPackage?.id || (packages[0]?.id || ''),
        guests_count: selectedPackage?.capacity_min || 2,
        check_in_date: tomorrowStr,
        check_out_date: dayAfterStr,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_notes: '',
    });

    // Currently selected package object
    const currentPkg = useMemo(() => {
        return packages.find((p) => p.id === parseInt(data.package_id)) || packages[0];
    }, [packages, data.package_id]);

    // Format Rupiah
    const formatRupiah = (num) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(num);
    };

    // Calculate nights & price
    const calculation = useMemo(() => {
        if (!data.check_in_date || !data.check_out_date || !currentPkg) {
            return { nights: 1, totalPrice: currentPkg?.price_regular || 0, isBlocked: false };
        }

        const start = new Date(data.check_in_date);
        const end = new Date(data.check_out_date);
        const timeDiff = end.getTime() - start.getTime();
        const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));

        let total = 0;
        let isBlocked = false;

        const curr = new Date(start);
        for (let i = 0; i < nights; i++) {
            const dateStr = curr.toISOString().split('T')[0];
            if (blockedDates.includes(dateStr)) {
                isBlocked = true;
            }

            const dayOfWeek = curr.getDay(); // 5 = Fri, 6 = Sat
            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

            if (isWeekend && currentPkg.price_weekend) {
                total += currentPkg.price_weekend;
            } else {
                total += currentPkg.price_regular;
            }

            curr.setDate(curr.getDate() + 1);
        }

        return { nights, totalPrice: total, isBlocked };
    }, [data.check_in_date, data.check_out_date, currentPkg, blockedDates]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('booking.store'));
    };

    return (
        <PublicLayout>
            <Head title="Formulir Reservasi Online — Beach Camp" />

            {/* Header Banner */}
            <section className="bg-[#231A12] text-white pt-36 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E37434_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-brand-primary/20 text-brand-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
                        Online Reservation
                    </span>
                    <h1 className="font-display font-bold text-3xl sm:text-5xl text-white mb-3">
                        Reservasi Tempat Camping
                    </h1>
                    <p className="text-sm sm:text-base text-[#F6F3C2]/85 max-w-xl mx-auto">
                        Lengkapi formulir di bawah untuk memesan tenda dan tanggal liburan pantai Anda.
                    </p>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-3 mt-8 max-w-md mx-auto">
                        <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-brand-primary' : 'bg-white/20'}`} />
                        <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-brand-primary' : 'bg-white/20'}`} />
                        <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 3 ? 'bg-brand-primary' : 'bg-white/20'}`} />
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-14 bg-brand-bg">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-brand-secondary shadow-xl overflow-hidden">
                        {/* STEP 1: Pilih Paket & Tamu */}
                        {step === 1 && (
                            <div className="p-6 sm:p-8 md:p-10 space-y-8 animate-fade-in">
                                <div>
                                    <h2 className="font-display font-bold text-2xl text-brand-text mb-1 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">1</span>
                                        Pilih Paket & Jumlah Tamu
                                    </h2>
                                    <p className="text-sm text-brand-text-muted">
                                        Pilih paket tenda yang sesuai dengan jumlah rombongan Anda.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {packages.map((pkg) => {
                                        const isSelected = parseInt(data.package_id) === pkg.id;
                                        return (
                                            <div
                                                key={pkg.id}
                                                onClick={() => {
                                                    setData('package_id', pkg.id);
                                                    if (data.guests_count < pkg.capacity_min) {
                                                        setData('guests_count', pkg.capacity_min);
                                                    }
                                                }}
                                                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                                    isSelected
                                                        ? 'border-brand-primary bg-[#FFFBF2] shadow-md ring-2 ring-brand-primary/20'
                                                        : 'border-brand-secondary hover:border-brand-primary/40 bg-white'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-display font-bold text-base text-brand-text">
                                                        {pkg.name}
                                                    </h3>
                                                    {pkg.badge && (
                                                        <span className="bg-brand-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                                            {pkg.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-brand-text-muted mb-3 line-clamp-2">
                                                    {pkg.short_description || pkg.description}
                                                </p>
                                                <div className="flex items-center justify-between pt-2 border-t border-brand-secondary/60 text-xs">
                                                    <span className="text-brand-text font-medium flex items-center gap-1">
                                                        <Users className="w-3.5 h-3.5 text-brand-primary" />
                                                        {pkg.capacity_min}–{pkg.capacity_max} Orang
                                                    </span>
                                                    <span className="font-bold text-brand-primary">
                                                        {formatRupiah(pkg.price_regular)}/mlm
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Guest Count input */}
                                <div className="p-5 rounded-2xl bg-brand-bg border border-brand-secondary">
                                    <label className="block text-sm font-semibold text-brand-text mb-2">
                                        Jumlah Tamu yang Akan Menginap:
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            min={currentPkg?.capacity_min || 1}
                                            max={currentPkg?.capacity_max ? currentPkg.capacity_max * 2 : 20}
                                            value={data.guests_count}
                                            onChange={(e) => setData('guests_count', parseInt(e.target.value) || 1)}
                                            className="w-32 px-4 py-2.5 rounded-xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary font-bold text-center"
                                        />
                                        <span className="text-xs text-brand-text-muted">
                                            Kapasitas ideal paket ini: <strong>{currentPkg?.capacity_min}–{currentPkg?.capacity_max} orang</strong>.
                                        </span>
                                    </div>
                                    {errors.guests_count && (
                                        <p className="text-xs text-brand-error mt-1">{errors.guests_count}</p>
                                    )}
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow transition-all"
                                    >
                                        <span>Lanjut: Pilih Tanggal</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Pilih Tanggal & Ketersediaan */}
                        {step === 2 && (
                            <div className="p-6 sm:p-8 md:p-10 space-y-8 animate-fade-in">
                                <div>
                                    <h2 className="font-display font-bold text-2xl text-brand-text mb-1 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">2</span>
                                        Tentukan Tanggal Menginap
                                    </h2>
                                    <p className="text-sm text-brand-text-muted">
                                        Pilih jadwal kedatangan (check-in) dan kepulangan (check-out).
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                                            Tanggal Check-In
                                        </label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            value={data.check_in_date}
                                            onChange={(e) => setData('check_in_date', e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary"
                                        />
                                        {errors.check_in_date && (
                                            <p className="text-xs text-brand-error mt-1">{errors.check_in_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                                            Tanggal Check-Out
                                        </label>
                                        <input
                                            type="date"
                                            min={data.check_in_date || new Date().toISOString().split('T')[0]}
                                            value={data.check_out_date}
                                            onChange={(e) => setData('check_out_date', e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary"
                                        />
                                        {errors.check_out_date && (
                                            <p className="text-xs text-brand-error mt-1">{errors.check_out_date}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Availability Check Banner */}
                                {calculation.isBlocked ? (
                                    <div className="p-4 rounded-2xl bg-red-50 border border-brand-error/30 flex items-start gap-3 text-brand-error text-sm">
                                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block font-semibold">Tanggal Tidak Tersedia</strong>
                                            Salah satu tanggal yang Anda pilih sedang dalam masa pemeliharaan atau telah diblokir. Silakan pilih tanggal lain.
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-2xl bg-green-50 border border-brand-success/30 flex items-start gap-3 text-brand-success text-sm">
                                        <Check className="w-5 h-5 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block font-semibold">Tanggal Tersedia!</strong>
                                            Durasi: <strong>{calculation.nights} Malam</strong>. Kavling tenda siap menyambut kedatangan Anda.
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="inline-flex items-center gap-2 text-brand-text hover:text-brand-primary font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Kembali</span>
                                    </button>

                                    <button
                                        type="button"
                                        disabled={calculation.isBlocked}
                                        onClick={() => setStep(3)}
                                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-50 text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow transition-all"
                                    >
                                        <span>Lanjut: Data Pemesan</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Data Pemesan & Konfirmasi Biaya */}
                        {step === 3 && (
                            <div className="p-6 sm:p-8 md:p-10 space-y-8 animate-fade-in">
                                <div>
                                    <h2 className="font-display font-bold text-2xl text-brand-text mb-1 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">3</span>
                                        Data Diri & Ringkasan Biaya
                                    </h2>
                                    <p className="text-sm text-brand-text-muted">
                                        Pastikan nomor WhatsApp dan email aktif untuk pengiriman konfirmasi booking.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5">
                                            Nama Lengkap
                                        </label>
                                        <div className="relative">
                                            <User className="w-4 h-4 text-brand-text-muted absolute left-4 top-3.5" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Contoh: Budi Santoso"
                                                value={data.customer_name}
                                                onChange={(e) => setData('customer_name', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary"
                                            />
                                        </div>
                                        {errors.customer_name && (
                                             <p className="text-xs text-brand-error mt-1">{errors.customer_name}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5">
                                                Nomor WhatsApp (Aktif)
                                            </label>
                                            <div className="relative">
                                                <Phone className="w-4 h-4 text-brand-text-muted absolute left-4 top-3.5" />
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="08123456789"
                                                    value={data.customer_phone}
                                                    onChange={(e) => setData('customer_phone', e.target.value)}
                                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary"
                                                />
                                            </div>
                                            {errors.customer_phone && (
                                                <p className="text-xs text-brand-error mt-1">{errors.customer_phone}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5">
                                                Alamat Email
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-4 h-4 text-brand-text-muted absolute left-4 top-3.5" />
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="budi@example.com"
                                                    value={data.customer_email}
                                                    onChange={(e) => setData('customer_email', e.target.value)}
                                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary"
                                                />
                                            </div>
                                            {errors.customer_email && (
                                                <p className="text-xs text-brand-error mt-1">{errors.customer_email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5">
                                            Catatan Khusus (Opsional)
                                        </label>
                                        <textarea
                                            rows="2"
                                            placeholder="Contoh: Perkiraan tiba sore hari, mohon tenda menghadap sunset..."
                                            value={data.customer_notes}
                                            onChange={(e) => setData('customer_notes', e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Order Cost Summary Card */}
                                <div className="p-6 rounded-3xl bg-[#FBF7EE] border border-brand-secondary space-y-3">
                                    <h3 className="font-display font-bold text-base text-brand-text">
                                        Rincian Pesanan
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-brand-text-muted">
                                            <span>Paket Dipilih:</span>
                                            <strong className="text-brand-text">{currentPkg?.name}</strong>
                                        </div>
                                        <div className="flex justify-between text-brand-text-muted">
                                            <span>Jumlah Tamu:</span>
                                            <span className="text-brand-text">{data.guests_count} Orang</span>
                                        </div>
                                        <div className="flex justify-between text-brand-text-muted">
                                            <span>Jadwal Menginap:</span>
                                            <span className="text-brand-text">{data.check_in_date} s/d {data.check_out_date} ({calculation.nights} Malam)</span>
                                        </div>
                                        <div className="pt-3 border-t border-brand-secondary flex justify-between items-baseline">
                                            <span className="font-bold text-brand-text">Total Biaya Reservasi:</span>
                                            <span className="font-display font-bold text-2xl text-brand-primary">
                                                {formatRupiah(calculation.totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-brand-text hover:text-brand-primary font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Kembali</span>
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-50 text-white font-semibold text-base px-9 py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5"
                                    >
                                        <CalendarCheck className="w-5 h-5" />
                                        <span>{processing ? 'Memproses...' : 'Konfirmasi & Buat Booking'}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </PublicLayout>
    );
}
