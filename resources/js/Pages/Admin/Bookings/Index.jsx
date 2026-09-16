import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    Search, 
    Filter, 
    CheckCircle2, 
    Clock, 
    XCircle, 
    Trash2, 
    Edit, 
    Phone, 
    Mail, 
    Calendar,
    MessageCircle,
    Eye
} from 'lucide-react';

export default function Index({ bookings, filters }) {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editStatus, setEditStatus] = useState('pending');
    const [adminNotes, setAdminNotes] = useState('');
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.bookings.index'), {
            search: searchTerm,
            status: filters?.status || 'all',
        }, {
            preserveState: true,
        });
    };

    const handleStatusFilter = (status) => {
        router.get(route('admin.bookings.index'), {
            status: status,
            search: filters?.search || undefined,
        }, {
            preserveState: true,
        });
    };

    const openEditModal = (booking) => {
        setSelectedBooking(booking);
        setEditStatus(booking.status);
        setAdminNotes(booking.admin_notes || '');
    };

    const handleUpdateStatus = (e) => {
        e.preventDefault();
        if (!selectedBooking) return;

        router.put(route('admin.bookings.update', selectedBooking.id), {
            status: editStatus,
            admin_notes: adminNotes,
        }, {
            onSuccess: () => setSelectedBooking(null),
        });
    };

    const handleDelete = (booking) => {
        if (confirm(`Hapus data reservasi ${booking.booking_code}?`)) {
            router.delete(route('admin.bookings.destroy', booking.id));
        }
    };

    return (
        <AdminLayout header="Kelola Reservasi Tamu">
            <Head title="Kelola Reservasi — Admin Beach Camp" />

            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Search & Filter Bar */}
                <div className="bg-white p-6 rounded-3xl border border-brand-secondary shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="w-full md:w-80">
                        <div className="relative">
                            <Search className="w-4 h-4 text-brand-text-muted absolute left-3.5 top-3" />
                            <input
                                type="text"
                                placeholder="Cari kode, nama, telepon..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary"
                            />
                        </div>
                    </form>

                    {/* Status Tabs */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {[
                            { key: 'all', label: 'Semua' },
                            { key: 'pending', label: 'Pending' },
                            { key: 'confirmed', label: 'Confirmed' },
                            { key: 'completed', label: 'Completed' },
                            { key: 'cancelled', label: 'Cancelled' },
                        ].map((s) => (
                            <button
                                key={s.key}
                                type="button"
                                onClick={() => handleStatusFilter(s.key)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                    (filters?.status === s.key || (!filters?.status && s.key === 'all'))
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-brand-bg text-brand-text hover:bg-brand-secondary/50'
                                }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-3xl border border-brand-secondary shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#FFFBF2] text-xs font-bold uppercase tracking-wider text-brand-text-muted border-b border-brand-secondary">
                                <tr>
                                    <th className="px-6 py-4">Kode Reservasi</th>
                                    <th className="px-6 py-4">Data Tamu</th>
                                    <th className="px-6 py-4">Paket & Tamu</th>
                                    <th className="px-6 py-4">Jadwal Menginap</th>
                                    <th className="px-6 py-4">Total Biaya</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-secondary/60">
                                {bookings.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-brand-text-muted">
                                            Tidak ditemukan data reservasi yang sesuai.
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.data.map((b) => (
                                        <tr key={b.id} className="hover:bg-brand-bg/40 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-mono font-bold text-xs text-brand-primary block">
                                                    {b.booking_code}
                                                </span>
                                                <span className="text-[10px] text-brand-text-muted">
                                                    Dibuat: {new Date(b.created_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <strong className="text-brand-text font-semibold block">
                                                    {b.customer_name}
                                                </strong>
                                                <span className="text-xs text-brand-text-muted block">
                                                    {b.customer_phone}
                                                </span>
                                                <span className="text-xs text-brand-text-muted block truncate max-w-[150px]">
                                                    {b.customer_email}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-xs">
                                                <span className="font-medium text-brand-text block">
                                                    {b.package?.name || 'Paket dihapus'}
                                                </span>
                                                <span className="text-brand-text-muted">
                                                    {b.guests_count} Orang ({b.tents_count} Tenda)
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-xs text-brand-text">
                                                <span>{b.check_in_date}</span>
                                                <span className="text-brand-text-muted block">s/d {b.check_out_date}</span>
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

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <a
                                                        href={`https://wa.me/${b.customer_phone.replace(/^0/, '62')}?text=${encodeURIComponent(`Halo ${b.customer_name}, perihal booking Beach Camp ${b.booking_code}: `)}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-1.5 rounded-lg bg-green-50 text-[#25D366] hover:bg-green-100 transition-colors"
                                                        title="Chat WhatsApp Tamu"
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(b)}
                                                        className="p-1.5 rounded-lg bg-brand-bg text-brand-primary hover:bg-brand-secondary transition-colors"
                                                        title="Ubah Status & Catatan"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(b)}
                                                        className="p-1.5 rounded-lg bg-red-50 text-brand-error hover:bg-red-100 transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {bookings.links && bookings.links.length > 3 && (
                        <div className="p-4 border-t border-brand-secondary/60 flex items-center justify-center gap-1">
                            {bookings.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                                        link.active
                                            ? 'bg-brand-primary text-white font-bold'
                                            : !link.url
                                                ? 'text-gray-300 pointer-events-none'
                                                : 'text-brand-text hover:bg-brand-secondary/50'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Edit Status & Notes */}
            {selectedBooking && (
                <div 
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedBooking(null)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-brand-secondary"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <span className="text-xs uppercase font-mono font-bold text-brand-primary tracking-wider block">
                                {selectedBooking.booking_code}
                            </span>
                            <h3 className="font-display font-bold text-xl text-brand-text mt-1">
                                Kelola Reservasi {selectedBooking.customer_name}
                            </h3>
                        </div>

                        {selectedBooking.customer_notes && (
                            <div className="p-4 rounded-2xl bg-brand-bg border border-brand-secondary text-xs space-y-1">
                                <strong className="text-brand-text block font-semibold">Catatan dari Tamu:</strong>
                                <p className="text-brand-text-muted italic">"{selectedBooking.customer_notes}"</p>
                            </div>
                        )}

                        <form onSubmit={handleUpdateStatus} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5">
                                    Status Reservasi
                                </label>
                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary text-sm font-semibold"
                                >
                                    <option value="pending">Pending (Menunggu DP/Konfirmasi)</option>
                                    <option value="confirmed">Confirmed (Terkonfirmasi)</option>
                                    <option value="completed">Completed (Selesai Menginap)</option>
                                    <option value="cancelled">Cancelled (Dibatalkan)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1.5">
                                    Catatan Internal Admin
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Contoh: Sudah DP 50% via BCA, minta tambahan kayu bakar..."
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary text-xs sm:text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedBooking(null)}
                                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-brand-text hover:bg-brand-secondary/40 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-semibold shadow transition-all"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
