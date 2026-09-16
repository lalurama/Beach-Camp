import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { CalendarOff, Plus, Trash2, Calendar } from 'lucide-react';

export default function Index({ blockedDates }) {
    const [form, setForm] = useState({
        date: '',
        reason: 'Maintenance Area',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.date) return;

        router.post(route('admin.blocked-dates.store'), form, {
            onSuccess: () => setForm({ date: '', reason: 'Maintenance Area' }),
        });
    };

    const handleDelete = (item) => {
        if (confirm(`Buka kembali tanggal ${item.date}?`)) {
            router.delete(route('admin.blocked-dates.destroy', item.id));
        }
    };

    return (
        <AdminLayout header="Kelola Ketersediaan & Blokir Tanggal">
            <Head title="Blokir Tanggal — Admin Beach Camp" />

            <div className="space-y-8 max-w-5xl mx-auto">
                {/* Intro */}
                <div className="bg-white p-6 rounded-3xl border border-brand-secondary shadow-sm">
                    <h2 className="font-display font-bold text-lg text-brand-text mb-1">
                        Atur Tanggal Tutup / Penuh
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-text-muted">
                        Blokir tanggal tertentu agar tidak bisa dipilih oleh calon tamu di halaman booking (misalnya saat ada private event, perbaikan fasilitas, cuaca ekstrem, atau kuota tenda sudah penuh).
                    </p>
                </div>

                {/* Form Blokir Tanggal Baru */}
                <div className="bg-white p-6 rounded-3xl border border-brand-secondary shadow-sm">
                    <h3 className="font-display font-semibold text-base text-brand-text mb-4 flex items-center gap-2">
                        <Plus className="w-4 h-4 text-brand-primary" />
                        <span>Tambah Tanggal yang Ingin Diblokir</span>
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-4">
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5">
                                Pilih Tanggal
                            </label>
                            <input
                                type="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary text-sm"
                            />
                        </div>

                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5">
                                Alasan Pemblokiran
                            </label>
                            <input
                                type="text"
                                placeholder="Misal: Private Event Komunitas, Maintenance..."
                                value={form.reason}
                                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm rounded-xl shadow transition-all shrink-0"
                        >
                            Blokir Tanggal Ini
                        </button>
                    </form>
                </div>

                {/* List of Blocked Dates */}
                <div className="bg-white rounded-3xl border border-brand-secondary shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-brand-secondary">
                        <h3 className="font-display font-bold text-base text-brand-text flex items-center gap-2">
                            <CalendarOff className="w-4 h-4 text-brand-error" />
                            <span>Daftar Tanggal yang Sedang Diblokir</span>
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#FFFBF2] text-xs font-bold uppercase tracking-wider text-brand-text-muted border-b border-brand-secondary">
                                <tr>
                                    <th className="px-6 py-4">Tanggal Ditutup</th>
                                    <th className="px-6 py-4">Alasan Pemblokiran</th>
                                    <th className="px-6 py-4">Waktu Ditambahkan</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-secondary/60">
                                {blockedDates.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-brand-text-muted">
                                            Tidak ada tanggal yang diblokir saat ini. Semua tanggal dibuka untuk booking.
                                        </td>
                                    </tr>
                                ) : (
                                    blockedDates.map((item) => (
                                        <tr key={item.id} className="hover:bg-brand-bg/40 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-brand-text flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-brand-primary" />
                                                <span>{item.date}</span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-brand-text-muted">
                                                {item.reason || 'Tidak ada keterangan'}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-brand-text-muted">
                                                {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item)}
                                                    className="inline-flex items-center gap-1.5 text-xs text-brand-error hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Buka Blokir</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
