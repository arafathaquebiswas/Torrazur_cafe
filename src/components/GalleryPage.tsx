import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Eye } from 'lucide-react';
import { ImageDetailModal } from './ImageDetailModal';

interface GalleryPageProps {
  galleryItems: GalleryItem[];
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ galleryItems }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Exterior', 'Interior', 'Bakery', 'Coffee', 'Food'];

  const filteredGallery = galleryItems.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="bg-[#1C120C] text-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-[0.3em] text-[#C88A4B] uppercase">
            VISUAL MOMENTS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            TORRAZUR GALLERY
          </h1>
          <p className="text-xs text-[#B5A191]">
            Step inside our café, explore freshly baked golden goods, and witness barista craftsmanship.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C88A4B] text-[#1C120C] font-bold shadow'
                    : 'bg-[#251810] text-[#D8C7B5] hover:bg-[#322116] hover:text-[#FAF6F0]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Masonry/Grid */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-16 text-[#A89382] text-xs">
            No gallery images found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative bg-[#241710] border border-[#3E281C] rounded-xl overflow-hidden aspect-4/3 cursor-pointer hover:border-[#C88A4B] transition-all duration-300 shadow-lg"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Always-visible Quick Eye Icon Badge on top-right */}
                <div className="absolute top-3 right-3 bg-[#1C120C]/85 text-[#FAF6F0] group-hover:text-[#1C120C] group-hover:bg-[#C88A4B] p-2 rounded-full border border-[#3E281C] group-hover:border-[#C88A4B] transition-all shadow-md z-10 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#1C120C] via-[#1C120C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <span className="text-[10px] font-mono tracking-widest text-[#C88A4B] uppercase font-bold">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#FAF6F0]">
                    {item.title}
                  </h3>
                  <div className="mt-2 text-xs text-[#FAF6F0] bg-[#C88A4B] text-[#1C120C] font-bold px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 w-fit shadow">
                    <Eye className="w-3.5 h-3.5" /> View Photo & Details
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Details Modal */}
      <ImageDetailModal
        item={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};
