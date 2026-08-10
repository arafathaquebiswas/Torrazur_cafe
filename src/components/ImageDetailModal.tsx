import React, { useState } from 'react';
import { X, Eye, MessageCircle, Phone, CheckCircle2, XCircle, Tag, ZoomIn, Info } from 'lucide-react';
import { MenuItem, GalleryItem, SiteSettings } from '../types';

export interface PictureDetailItem {
  title: string;
  imageUrl: string;
  category?: string;
  description?: string;
  price?: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
}

interface ImageDetailModalProps {
  item: PictureDetailItem | MenuItem | GalleryItem | null;
  onClose: () => void;
  settings?: SiteSettings;
}

export const ImageDetailModal: React.FC<ImageDetailModalProps> = ({
  item,
  onClose,
  settings,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!item) return null;

  // Normalize item fields
  const title = 'name' in item ? item.name : 'title' in item ? item.title : item.title;
  const imageUrl = item.imageUrl;
  const category = item.category || 'Specialty';
  const description = item.description || 'Authentic craft served fresh daily at Torrazur Bakery & Café.';
  const price = 'price' in item ? item.price : undefined;
  const isAvailable = 'isAvailable' in item ? item.isAvailable : true;
  const isFeatured = 'isFeatured' in item ? item.isFeatured : false;

  const whatsappNumber = settings?.whatsapp?.replace(/[^0-9]/g, '') || '8801335157144';
  const phoneNumber = settings?.phone || '01335-157144';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#1C120C] border border-[#3E281C] rounded-2xl overflow-hidden shadow-2xl my-auto text-[#FAF6F0]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 bg-[#1C120C]/80 hover:bg-[#C88A4B] text-[#FAF6F0] hover:text-[#1C120C] rounded-full border border-[#3E281C] transition-all z-20 cursor-pointer shadow-lg"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Image with Zoom */}
          <div className="md:col-span-7 bg-[#140D08] relative group flex items-center justify-center min-h-[280px] sm:min-h-[380px] max-h-[70vh] overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              referrerPolicy="no-referrer"
            />
            
            {/* Zoom Hint Badge */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-3 right-3 bg-[#1C120C]/80 hover:bg-[#1C120C] text-[#C88A4B] border border-[#3E281C] px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 shadow transition-colors cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{isZoomed ? 'Reset Zoom' : 'Click to Zoom'}</span>
            </button>

            {/* Category badge over image */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-[#1C120C]/90 text-[#C88A4B] text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded border border-[#C88A4B]/40 shadow-md flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {category}
              </span>
              {isFeatured && (
                <span className="bg-[#C88A4B] text-[#1C120C] text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded shadow-md">
                  ★ Featured
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Detailed Info */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#21150D]">
            <div className="space-y-4">
              {/* Header Title & Price */}
              <div className="border-b border-[#362317] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C88A4B] uppercase tracking-wider mb-1">
                  <Info className="w-3.5 h-3.5 text-[#C88A4B]" /> Image & Item Details
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6F0] leading-tight">
                  {title}
                </h2>
                {price && (
                  <div className="mt-3 inline-block bg-[#160E08] border border-[#C88A4B]/50 text-[#C88A4B] font-bold text-lg px-3.5 py-1 rounded">
                    {price}
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="text-[#B5A191]">Status:</span>
                {isAvailable ? (
                  <span className="text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded border border-[#25D366]/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Freshly Prepared & Available
                  </span>
                ) : (
                  <span className="text-[#E57373] bg-[#E57373]/10 px-2.5 py-1 rounded border border-[#E57373]/30 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Currently Sold Out
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#C88A4B] tracking-widest uppercase flex items-center gap-1">
                  <Tag className="w-3 h-3" /> About this Selection
                </h4>
                <p className="text-sm text-[#D8C7B5] leading-relaxed bg-[#19100A] p-4 rounded-lg border border-[#332014]">
                  {description}
                </p>
              </div>

              {/* Cafe Craft Note */}
              <div className="bg-[#2A1B12] p-3.5 rounded border border-[#422B1D] text-xs text-[#B8A393] space-y-1">
                <div className="font-bold text-[#C88A4B]">Torrazur Quality Guarantee</div>
                <div>Baked, roasted, and brewed daily at Sonia Sobhan 5th Avenue, Bashundhara R/A, Dhaka.</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#362317] space-y-2">
              {price ? (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi%20Torrazur,%20I%20saw%20${encodeURIComponent(title)}%20(${price})%20on%20your%20website%20and%20would%20like%20to%20order/inquire.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-[#140D08] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Order via WhatsApp
                </a>
              ) : (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi%20Torrazur,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#C88A4B] hover:bg-[#b57a3e] text-[#1C120C] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Inquire via WhatsApp
                </a>
              )}

              <a
                href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
                className="w-full py-2.5 bg-[#2A1B12] hover:bg-[#382418] text-[#FAF6F0] font-medium text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 border border-[#422B1D] transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#C88A4B]" />
                Call Café Hotline ({phoneNumber})
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
