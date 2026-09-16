import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Check, 
    X, 
    Users, 
    Star, 
    Sparkles,
    Image as ImageIcon
} from 'lucide-react';

export default function Index({ packages }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);
    const [featureInput, setFeatureInput] = useState('');

    const defaultForm = {
        name: '',
        short_description: '',
        description: '',
        capacity_min: 2,
        capacity_max: 4,
        price_regular: 250000,
        price_weekend: 300000,
        features: ['Tenda Dome Waterproof', 'Matras & Sleeping Bag', 'Lampu Tenda'],
        image_url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
        badge: '',
        is_popular: false,
        is_active: true,
        sort_order: 0,
    };

    const [form, setForm] = useState(defaultForm);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(number);
    };

    const openCreateModal = () => {
        setEditingPackage(null);
        setForm(defaultForm);
        setModalOpen(true);
    };

    const openEditModal = (pkg) => {
        setEditingPackage(pkg);
        setForm({
            name: pkg.name,
            short_description: pkg.short_description || '',
            description: pkg.description,
            capacity_min: pkg.capacity_min,
            capacity_max: pkg.capacity_max,
            price_regular: pkg.price_regular,
            price_weekend: pkg.price_weekend || '',
            features: Array.isArray(pkg.features) ? pkg.features : [],
            image_url: pkg.image_url || '',
            badge: pkg.badge || '',
            is_popular: pkg.is_popular,
            is_active: pkg.is_active,
            sort_order: pkg.sort_order || 0,
        });
        setModalOpen(true);
    };

    const addFeature = () => {
        if (!featureInput.trim()) return;
        setForm({ ...form, features: [...form.features, featureInput.trim()] });
        setFeatureInput('');
    };

    const removeFeature = (idx) => {
        setForm({
            ...form,
            features: form.features.filter((_, i) => i !== idx),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPackage) {
            router.put(route('admin.packages.update', editingPackage.id), form, {
                onSuccess: () => setModalOpen(false),
            });
        } else {
            router.post(route('admin.packages.store'), form, {
                onSuccess: () => setModalOpen(false),
            });
        }
    };

    const handleDelete = (pkg) => {
        if (confirm(`Hapus paket ${pkg.name}?`)) {
            router.delete(route('admin.packages.destroy', pkg.id));
        }
    };

    return (
        <AdminLayout header="Kelola Paket & Harga Camping">
            <Head title="Kelola Paket — Admin Beach Camp" />

            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-brand-text-muted">
                        Daftar paket camping yang tersedia untuk dipesan wisatawan.
                    </p>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Paket Baru</span>
                    </button>
                </div>

                {/* Packages Table */}
                <div className="bg-white rounded-3xl border border-brand-secondary shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#FFFBF2] text-xs font-bold uppercase tracking-wider text-brand-text-muted border-b border-brand-secondary">
                                <tr>
                                    <th className="px-6 py-4">Foto & Paket</th>
                                    <th className="px-6 py-4">Kapasitas</th>
                                    <th className="px-6 py-4">Harga Reguler</th>
                                    <th className="px-6 py-4">Harga Weekend</th>
                                    <th className="px-6 py-4">Badge / Populer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-secondary/60">
                                {packages.map((pkg) => (
                                    <tr key={pkg.id} className="hover:bg-brand-bg/40 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={pkg.image_url || 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=200&q=80'}
                                                    alt={pkg.name}
                                                    className="w-12 h-12 rounded-xl object-cover border border-brand-secondary shrink-0"
                                                />
                                                <div>
                                                    <strong className="font-display font-semibold text-brand-text block">
                                                        {pkg.name}
                                                    </strong>
                                                    <span className="text-xs text-brand-text-muted line-clamp-1 max-w-xs">
                                                        {pkg.short_description || pkg.description}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-brand-text">
                                            {pkg.capacity_min}–{pkg.capacity_max} Orang
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-brand-primary">
                                            {formatRupiah(pkg.price_regular)}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-semibold text-brand-text">
                                            {pkg.price_weekend ? formatRupiah(pkg.price_weekend) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            {pkg.badge && (
                                                <span className="bg-brand-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block mb-1">
                                                    {pkg.badge}
                                                </span>
                                            )}
                                            {pkg.is_popular && (
                                                <span className="text-[11px] text-amber-600 font-semibold block flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-current" /> Pilihan Populer
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                                                pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {pkg.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(pkg)}
                                                    className="p-1.5 rounded-lg bg-brand-bg text-brand-primary hover:bg-brand-secondary transition-colors"
                                                    title="Edit Paket"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(pkg)}
                                                    className="p-1.5 rounded-lg bg-red-50 text-brand-error hover:bg-red-100 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Create/Edit Package */}
            {modalOpen && (
                <div 
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
                    onClick={() => setModalOpen(false)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-brand-secondary my-8 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font-display font-bold text-xl text-brand-text">
                            {editingPackage ? 'Edit Paket Camping' : 'Tambah Paket Camping Baru'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Nama Paket
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Paket Sunset Glamping"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Deskripsi Singkat (Headline)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Sempurna untuk pasangan menikmati senja tepi pantai."
                                    value={form.short_description}
                                    onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Deskripsi Lengkap
                                </label>
                                <textarea
                                    rows="3"
                                    required
                                    placeholder="Jelaskan detail fasilitas dan pengalaman yang didapatkan..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary focus:border-brand-primary focus:ring-brand-primary text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                        Kapasitas Min
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.capacity_min}
                                        onChange={(e) => setForm({ ...form, capacity_min: parseInt(e.target.value) || 1 })}
                                        className="w-full px-3 py-2 rounded-xl border border-brand-secondary text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                        Kapasitas Max
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.capacity_max}
                                        onChange={(e) => setForm({ ...form, capacity_max: parseInt(e.target.value) || 1 })}
                                        className="w-full px-3 py-2 rounded-xl border border-brand-secondary text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                        Harga Weekday
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="10000"
                                        value={form.price_regular}
                                        onChange={(e) => setForm({ ...form, price_regular: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 rounded-xl border border-brand-secondary text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                        Harga Weekend
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="10000"
                                        value={form.price_weekend}
                                        onChange={(e) => setForm({ ...form, price_weekend: parseInt(e.target.value) || '' })}
                                        className="w-full px-3 py-2 rounded-xl border border-brand-secondary text-sm"
                                    />
                                </div>
                            </div>

                            {/* Features list */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Daftar Fasilitas Termasuk
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Ketik fasilitas baru (contoh: Kasur Springbed)..."
                                        value={featureInput}
                                        onChange={(e) => setFeatureInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                                        className="flex-1 px-4 py-2 rounded-xl border border-brand-secondary text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-xl"
                                    >
                                        Tambah
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {form.features.map((feat, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-bg border border-brand-secondary text-xs text-brand-text"
                                        >
                                            <span>{feat}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(idx)}
                                                className="text-brand-text-muted hover:text-brand-error"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                        URL Gambar Utama
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={form.image_url}
                                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                        Badge Khusus (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Misal: Best Seller, Favorit"
                                        value={form.badge}
                                        onChange={(e) => setForm({ ...form, badge: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 text-xs font-medium text-brand-text cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.is_popular}
                                        onChange={(e) => setForm({ ...form, is_popular: e.target.checked })}
                                        className="rounded border-brand-secondary text-brand-primary focus:ring-brand-primary"
                                    />
                                    <span>Tampilkan di Paket Populer Beranda</span>
                                </label>

                                <label className="flex items-center gap-2 text-xs font-medium text-brand-text cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.is_active}
                                        onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                                        className="rounded border-brand-secondary text-brand-primary focus:ring-brand-primary"
                                    />
                                    <span>Paket Aktif & Tampil di Web</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-brand-secondary">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-brand-text hover:bg-brand-secondary/40"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-semibold shadow"
                                >
                                    {editingPackage ? 'Simpan Perubahan' : 'Tambah Paket'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
