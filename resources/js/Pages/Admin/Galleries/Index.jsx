import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Trash2, Edit, Image as ImageIcon, Eye } from 'lucide-react';

export default function Index({ galleries }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        title: '',
        category: 'lokasi',
        media_type: 'image',
        image_url: '',
        caption: '',
        sort_order: 0,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.galleries.store'), form, {
            onSuccess: () => {
                setModalOpen(false);
                setForm({
                    title: '',
                    category: 'lokasi',
                    media_type: 'image',
                    image_url: '',
                    caption: '',
                    sort_order: 0,
                    is_active: true,
                });
            },
        });
    };

    const handleDelete = (item) => {
        if (confirm(`Hapus foto "${item.title}" dari galeri?`)) {
            router.delete(route('admin.galleries.destroy', item.id));
        }
    };

    return (
        <AdminLayout header="Kelola Galeri Foto & Video">
            <Head title="Kelola Galeri — Admin Beach Camp" />

            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-brand-text-muted">
                        Total {galleries.length} media foto/video tersimpan di galeri.
                    </p>
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Upload / Tambah Media</span>
                    </button>
                </div>

                {/* Grid of gallery media */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleries.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl border border-brand-secondary overflow-hidden shadow-sm flex flex-col justify-between group"
                        >
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <span className="absolute top-3 left-3 bg-black/60 text-brand-secondary text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                                    {item.category}
                                </span>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-display font-semibold text-sm text-brand-text line-clamp-1">
                                        {item.title}
                                    </h4>
                                    {item.caption && (
                                        <p className="text-xs text-brand-text-muted line-clamp-2 mt-1">
                                            {item.caption}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-3 mt-3 border-t border-brand-secondary/60 flex items-center justify-between">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                        item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {item.is_active ? 'Aktif' : 'Disembunyikan'}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item)}
                                        className="p-1.5 text-brand-error hover:bg-red-50 rounded-lg transition-colors"
                                        title="Hapus Media"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Tambah Media */}
            {modalOpen && (
                <div 
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setModalOpen(false)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-brand-secondary"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font-display font-bold text-xl text-brand-text">
                            Tambah Media ke Galeri
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Judul / Caption Singkat
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Misal: Senja di Tepi Pantai Beach Camp"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Kategori
                                </label>
                                <select
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                >
                                    <option value="lokasi">Pantai & Lokasi</option>
                                    <option value="fasilitas">Tenda & Fasilitas</option>
                                    <option value="aktivitas">Aktivitas Wisatawan</option>
                                    <option value="malam">Malam & Api Unggun</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    URL Gambar (Image URL)
                                </label>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://images.unsplash.com/..."
                                    value={form.image_url}
                                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Deskripsi Tambahan (Opsional)
                                </label>
                                <textarea
                                    rows="2"
                                    placeholder="Ceritakan momen dalam foto ini..."
                                    value={form.caption}
                                    onChange={(e) => setForm({ ...form, caption: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
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
                                    Simpan Media
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
