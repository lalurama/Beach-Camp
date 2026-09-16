import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, Phone, Mail, MapPin, Globe, Sparkles } from 'lucide-react';

export default function Index({ settings }) {
    const [form, setForm] = useState({
        site_name: settings?.site_name || 'Beach Camp',
        tagline: settings?.tagline || 'Tempat Wisata & Camping Terbaik di Tepi Pantai',
        hero_title: settings?.hero_title || 'Rasakan Hangatnya Senja & Deburan Ombak di Tepi Pantai',
        hero_subtitle: settings?.hero_subtitle || 'Camping pantai nyaman, bersih, dan bebas repot.',
        whatsapp_number: settings?.whatsapp_number || '6281234567890',
        contact_email: settings?.contact_email || 'halo@beachcamp.id',
        instagram_handle: settings?.instagram_handle || '@beachcamp.id',
        address: settings?.address || 'Kawasan Pesisir Pantai Indah, Jawa Timur',
        operating_hours: settings?.operating_hours || 'Check-in: 14.00 WIB | Check-out: 12.00 WIB',
        about_title: settings?.about_title || 'Kisah Dimulainya Beach Camp',
        about_story: settings?.about_story || '',
        google_maps_embed: settings?.google_maps_embed || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.settings.update'), form);
    };

    return (
        <AdminLayout header="Pengaturan Website & Kontak">
            <Head title="Pengaturan Website — Admin Beach Camp" />

            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General & Hero Info */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-secondary shadow-sm space-y-5">
                        <div className="flex items-center gap-2 border-b border-brand-secondary/60 pb-3">
                            <Sparkles className="w-5 h-5 text-brand-primary" />
                            <h3 className="font-display font-bold text-lg text-brand-text">
                                Identitas & Teks Beranda (Hero)
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Nama Bisnis / Brand
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.site_name}
                                    onChange={(e) => setForm({ ...form, site_name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Tagline Singkat
                                </label>
                                <input
                                    type="text"
                                    value={form.tagline}
                                    onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                Judul Utama di Banner Beranda (Hero Title)
                            </label>
                            <input
                                type="text"
                                value={form.hero_title}
                                onChange={(e) => setForm({ ...form, hero_title: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                Subtitle di Banner Beranda (Hero Subtitle)
                            </label>
                            <textarea
                                rows="2"
                                value={form.hero_subtitle}
                                onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                            />
                        </div>
                    </div>

                    {/* Kontak & Lokasi */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-secondary shadow-sm space-y-5">
                        <div className="flex items-center gap-2 border-b border-brand-secondary/60 pb-3">
                            <Phone className="w-5 h-5 text-brand-primary" />
                            <h3 className="font-display font-bold text-lg text-brand-text">
                                Kontak & Layanan Tamu
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Nomor WhatsApp (Awali 62)
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="6281234567890"
                                    value={form.whatsapp_number}
                                    onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Email Kontak
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={form.contact_email}
                                    onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Akun Instagram
                                </label>
                                <input
                                    type="text"
                                    placeholder="@beachcamp.id"
                                    value={form.instagram_handle}
                                    onChange={(e) => setForm({ ...form, instagram_handle: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Alamat Fisik Lokasi
                                </label>
                                <input
                                    type="text"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                    Jam Operasional
                                </label>
                                <input
                                    type="text"
                                    value={form.operating_hours}
                                    onChange={(e) => setForm({ ...form, operating_hours: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                Google Maps Embed URL (Iframe Src)
                            </label>
                            <input
                                type="text"
                                placeholder="https://www.google.com/maps/embed?pb=..."
                                value={form.google_maps_embed}
                                onChange={(e) => setForm({ ...form, google_maps_embed: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                            />
                        </div>
                    </div>

                    {/* Cerita Tentang Kami */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-secondary shadow-sm space-y-5">
                        <div className="flex items-center gap-2 border-b border-brand-secondary/60 pb-3">
                            <Globe className="w-5 h-5 text-brand-primary" />
                            <h3 className="font-display font-bold text-lg text-brand-text">
                                Teks Halaman "Tentang Kami"
                            </h3>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                Judul Cerita
                            </label>
                            <input
                                type="text"
                                value={form.about_title}
                                onChange={(e) => setForm({ ...form, about_title: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                                Isi Cerita Beach Camp
                            </label>
                            <textarea
                                rows="5"
                                value={form.about_story}
                                onChange={(e) => setForm({ ...form, about_story: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-brand-secondary text-sm leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
                        >
                            <Save className="w-4 h-4" />
                            <span>Simpan Semua Pengaturan</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
