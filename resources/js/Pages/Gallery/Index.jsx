import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';

export default function Index({ galleries, currentCategory }) {
    const [activeModal, setActiveModal] = useState(null);

    const categories = [
        { key: 'all', label: 'Semua Momen' },
        { key: 'lokasi', label: 'Pantai & Pemandangan' },
        { key: 'fasilitas', label: 'Tenda & Fasilitas' },
        { key: 'aktivitas', label: 'Keseruan Wisatawan' },
        { key: 'malam', label: 'Suasana Malam & Api Unggun' },
    ];

    const handleCategorySelect = (catKey) => {
        router.get(route('gallery.index'), {
            category: catKey === 'all' ? undefined : catKey,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <PublicLayout>
            <Head title="Galeri Foto & Video — Beach Camp" />

            {/* Header Banner */}
            <section className="bg-[#231A12] text-white pt-36 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E37434_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-brand-primary/20 text-brand-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
                        Album Kenangan
                    </span>
                    <h1 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4">
                        Galeri Beach Camp
                    </h1>
                    <p className="text-base sm:text-lg text-[#F6F3C2]/85 max-w-2xl mx-auto leading-relaxed">
                        Lihat potret nyata keindahan pasir pantai, tenda nyaman, dan kehangatan malam di tempat kami.
                    </p>
                </div>
            </section>

            {/* Category Filter Tabs */}
            <div className="bg-white border-b border-brand-secondary py-4 sticky top-16 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                type="button"
                                onClick={() => handleCategorySelect(cat.key)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                                    (currentCategory === cat.key || (cat.key === 'all' && (!currentCategory || currentCategory === 'all')))
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-brand-bg text-brand-text hover:bg-brand-secondary/60'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <section className="py-16 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {galleries.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-3xl border border-brand-secondary">
                            <ImageIcon className="w-12 h-12 text-brand-primary mx-auto mb-3" />
                            <p className="text-brand-text-muted text-base">
                                Belum ada foto dalam kategori ini.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {galleries.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setActiveModal(item)}
                                    className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-100 border border-brand-secondary/60"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                                        <div className="flex justify-end">
                                            <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                                                <ZoomIn className="w-5 h-5" />
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary bg-black/40 px-2.5 py-1 rounded-full inline-block mb-2">
                                                {item.category}
                                            </span>
                                            <h3 className="text-white font-display font-semibold text-base sm:text-lg leading-snug">
                                                {item.title}
                                            </h3>
                                            {item.caption && (
                                                <p className="text-white/80 text-xs mt-1 line-clamp-2">
                                                    {item.caption}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {activeModal && (
                <div 
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
                    onClick={() => setActiveModal(null)}
                >
                    <div 
                        className="relative max-w-4xl w-full bg-[#1A140E] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center transition-colors focus:outline-none"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image */}
                        <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                            <img
                                src={activeModal.image_url}
                                alt={activeModal.title}
                                className="max-h-[70vh] w-auto object-contain"
                            />
                        </div>

                        {/* Details */}
                        <div className="p-6 text-white bg-[#231A12]">
                            <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider block mb-1">
                                Kategori: {activeModal.category}
                            </span>
                            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                                {activeModal.title}
                            </h3>
                            {activeModal.caption && (
                                <p className="text-sm text-[#B3A495] mt-2 leading-relaxed">
                                    {activeModal.caption}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
