import React from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Star, CheckCircle, XCircle, Trash2, Heart } from 'lucide-react';

export default function Index({ testimonials }) {
    const handleToggleApprove = (item) => {
        router.put(route('admin.testimonials.update', item.id), {
            is_approved: !item.is_approved,
            is_featured: item.is_featured,
        });
    };

    const handleToggleFeatured = (item) => {
        router.put(route('admin.testimonials.update', item.id), {
            is_approved: item.is_approved,
            is_featured: !item.is_featured,
        });
    };

    const handleDelete = (item) => {
        if (confirm(`Hapus ulasan dari ${item.customer_name}?`)) {
            router.delete(route('admin.testimonials.destroy', item.id));
        }
    };

    return (
        <AdminLayout header="Kelola Testimoni & Ulasan Tamu">
            <Head title="Kelola Testimoni — Admin Beach Camp" />

            <div className="space-y-6 max-w-7xl mx-auto">
                <p className="text-sm text-brand-text-muted">
                    Setujui (approve) testimoni yang masuk agar tampil di halaman beranda website.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-3xl p-6 border shadow-sm flex flex-col justify-between transition-all ${
                                item.is_approved ? 'border-brand-secondary' : 'border-amber-300 bg-amber-50/30'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-1 text-brand-warning">
                                        {[...Array(item.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleFeatured(item)}
                                            className={`p-1 rounded-lg text-xs font-semibold ${
                                                item.is_featured
                                                    ? 'text-brand-primary bg-brand-primary/10'
                                                    : 'text-gray-400 hover:text-brand-primary'
                                            }`}
                                            title="Tampilkan di Banner Utama (Featured)"
                                        >
                                            <Heart className="w-4 h-4 fill-current" />
                                        </button>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                            item.is_approved ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                            {item.is_approved ? 'Approved' : 'Pending'}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-sm text-brand-text leading-relaxed italic mb-4">
                                    "{item.content}"
                                </p>
                            </div>

                            <div>
                                <div className="pt-4 border-t border-brand-secondary/60 flex items-center justify-between">
                                    <div>
                                        <strong className="font-display font-semibold text-sm text-brand-text block">
                                            {item.customer_name}
                                        </strong>
                                        <span className="text-xs text-brand-text-muted">
                                            {item.customer_origin || 'Tamu'} {item.stay_date ? `• ${item.stay_date}` : ''}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleApprove(item)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                                                item.is_approved
                                                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                                    : 'bg-brand-success text-white hover:bg-green-700'
                                            }`}
                                        >
                                            {item.is_approved ? 'Tolak' : 'Setujui'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item)}
                                            className="p-1.5 text-brand-error hover:bg-red-50 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
