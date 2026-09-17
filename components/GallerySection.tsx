'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, X, ZoomIn, Upload, Plus, Tag } from 'lucide-react';
import { GalleryItem } from '../lib/types';
import { INITIAL_GALLERY_ITEMS } from '../lib/data';
import { trackEvent } from '../lib/analytics';

const STORAGE_KEY_CUSTOM_PHOTOS = 'nicole_salon_custom_gallery_photos';

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>('tutti');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_PHOTOS);
      if (stored) {
        const parsed: GalleryItem[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const timer = setTimeout(() => {
            setItems([...parsed, ...INITIAL_GALLERY_ITEMS]);
          }, 0);
          return () => clearTimeout(timer);
        }
      }
    } catch {}
  }, []);
  
  // Custom upload state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'balayage' | 'sposa' | 'trattamenti' | 'salone'>('balayage');
  const [newDescription, setNewDescription] = useState('');
  const [newImageBase64, setNewImageBase64] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Seleziona un file immagine valido (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('L’immagine è troppo grande. Dimensione massima 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setNewImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageBase64) {
      setUploadError('Seleziona prima una foto da caricare.');
      return;
    }
    if (!newTitle.trim()) {
      setUploadError('Inserisci un titolo per il lavoro o la foto.');
      return;
    }

    const newItem: GalleryItem = {
      id: 'custom-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      image: newImageBase64,
      description: newDescription.trim() || 'Foto caricata direttamente dall’Atelier.',
      tags: [newCategory === 'balayage' ? 'Balayage' : newCategory === 'sposa' ? 'Sposa' : 'Salone', 'Nuovo'],
    };

    const updated = [newItem, ...items];
    setItems(updated);

    // Save only custom uploads to localStorage
    try {
      const storedCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_PHOTOS);
      const list: GalleryItem[] = storedCustom ? JSON.parse(storedCustom) : [];
      list.unshift(newItem);
      localStorage.setItem(STORAGE_KEY_CUSTOM_PHOTOS, JSON.stringify(list));
    } catch {}

    trackEvent('service_view', `Caricata nuova foto: ${newItem.title}`);

    // Reset and close modal
    setNewTitle('');
    setNewDescription('');
    setNewImageBase64(null);
    setShowUploadModal(false);
  };

  const filteredItems = activeCategory === 'tutti'
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <section id="galleria" className="py-16 sm:py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0eae1] text-[#8c5d2b] text-xs uppercase tracking-widest font-semibold mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>I Nostri Lavori & Il Salone</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917]">
              Galleria Fotografica Realizzazioni
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
              Esplora i nostri Balayage sartoriali, le creazioni sposa più ricercate e gli angoli dedicati al benessere del nostro atelier a Milano.
            </p>
          </div>

          {/* Add Photo Button */}
          <div>
            <button
              id="btn-open-upload-photo"
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-[#ebdccb] text-stone-800 border border-stone-300 text-xs sm:text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4 text-[#8c5d2b]" />
              <span>Carica Foto Salone</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { key: 'tutti', label: 'Tutti i Lavori' },
            { key: 'balayage', label: '✨ Balayage & Colore' },
            { key: 'sposa', label: '💍 Acconciature Sposa' },
            { key: 'trattamenti', label: '💆‍♀️ Trattamenti & Spa' },
            { key: 'salone', label: '🏛️ L’Atelier' },
          ].map((cat) => (
            <button
              key={cat.key}
              id={`filter-btn-${cat.key}`}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.key
                  ? 'bg-[#1c1917] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`gallery-card-${item.id}`}
              onClick={() => setActiveLightbox(item)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#e8ded0] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="p-3 rounded-full bg-white/90 text-stone-900 shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#8c5d2b] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#faf8f5] rounded-2xl overflow-hidden shadow-2xl border border-stone-700 flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Chiudi anteprima"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image */}
            <div className="relative w-full md:w-3/5 h-80 sm:h-96 md:h-auto min-h-[320px] bg-black">
              <Image
                src={activeLightbox.image}
                alt={activeLightbox.title}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Info Side */}
            <div className="p-6 sm:p-8 md:w-2/5 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#ebdccb] text-[#8c5d2b]">
                    {activeLightbox.category}
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
                  {activeLightbox.title}
                </h3>

                <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                  {activeLightbox.description}
                </p>

                <div className="mt-6 pt-4 border-t border-stone-200">
                  <span className="text-xs text-stone-400 uppercase tracking-wider block mb-2 font-medium">
                    Tag correlati
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLightbox.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-stone-200/70 text-stone-700"
                      >
                        <Tag className="w-3 h-3 text-[#8c5d2b]" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200">
                <a
                  href="#contatti"
                  onClick={() => setActiveLightbox(null)}
                  className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-[#1c1917] text-white font-medium text-sm hover:bg-[#8c5d2b] transition-colors"
                >
                  Richiedi un Risultato Simile
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Custom Photo Modal */}
      {showUploadModal && (
        <div
          id="upload-photo-modal"
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#faf8f5] rounded-2xl p-6 sm:p-8 border border-stone-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-[#8c5d2b]" />
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Carica Nuova Foto nel Salone
              </h3>
            </div>

            <p className="text-xs text-stone-500 mb-6">
              Aggiungi foto dei tuoi Balayage, creazioni sposa o scatti del salone per visualizzarle immediatamente nel catalogo lavori.
            </p>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
              {/* File Input */}
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center hover:border-[#8c5d2b] transition-colors bg-white">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                  id="salon-photo-file-input"
                />
                <label
                  htmlFor="salon-photo-file-input"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  {newImageBase64 ? (
                    <div className="relative w-36 h-36 rounded-lg overflow-hidden border border-stone-200 mb-2">
                      <Image
                        src={newImageBase64}
                        alt="Anteprima"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <Camera className="w-8 h-8 text-stone-400 mb-2" />
                  )}
                  <span className="text-xs font-semibold text-[#8c5d2b]">
                    {newImageBase64 ? 'Cambia Immagine Selezionata' : 'Clicca per scegliere una foto'}
                  </span>
                  <span className="text-[11px] text-stone-400 mt-1">PNG, JPG, WebP fino a 8MB</span>
                </label>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Titolo Lavoro / Descrizione Breve *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Es: Balayage Biondo Vaniglia su Capelli Lunghi"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] bg-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Categoria Servizio *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] bg-white"
                >
                  <option value="balayage">Balayage & Color Couture</option>
                  <option value="sposa">Acconciature Sposa & Cerimonia</option>
                  <option value="trattamenti">Trattamenti & Hair Spa</option>
                  <option value="salone">Atelier & Spazi Salone</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Dettagli Tecnici (Opzionale)
                </label>
                <textarea
                  rows={2}
                  placeholder="Es: Tonalizzazione con gloss freddo, protezione plex, styling a onde."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8c5d2b] bg-white resize-none"
                />
              </div>

              {uploadError && (
                <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                  {uploadError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-medium rounded-lg bg-[#1c1917] text-white hover:bg-[#8c5d2b] transition-colors"
                >
                  Aggiungi alla Galleria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
