import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface GalleryManagerProps {
  galleryItems: GalleryItem[];
  onRefresh: () => void;
}

export const GalleryManager: React.FC<GalleryManagerProps> = ({ galleryItems, onRefresh }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Café',
    imageUrl: '/images/torrazur-01.jpg',
    sortOrder: galleryItems.length + 1,
  });

  const handleAdd = async () => {
    if (!newItem.title || !newItem.imageUrl) return;
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (res.ok) {
        setIsCreating(false);
        setNewItem({ title: '', category: 'Café', imageUrl: '', sortOrder: galleryItems.length + 1 });
        onRefresh();
      }
    } catch (err) {
      console.error('Failed to add gallery image:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete image from gallery?')) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) onRefresh();
    } catch (err) {
      console.error('Failed to delete image:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Gallery Management</h2>
          <p className="text-xs text-[#1A1A1A]/60 font-medium">Manage showcase photography for Café, Bakery, Coffee, and Interior.</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#3D2B1F] text-[#F9F7F2] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E8D4BE]" />
          <span>Add Image</span>
        </button>
      </div>

      {isCreating && (
        <div className="bg-[#E8E4D9] border border-[#1A1A1A]/20 p-6 space-y-4 shadow-xl">
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Add New Gallery Image</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">Image Title</label>
              <input
                type="text"
                value={newItem.title || ''}
                onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">Category</label>
              <select
                value={newItem.category || 'Café'}
                onChange={e => setNewItem({ ...newItem, category: e.target.value as any })}
                className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
              >
                <option value="Café">Café</option>
                <option value="Bakery">Bakery</option>
                <option value="Coffee">Coffee</option>
                <option value="Food">Food</option>
                <option value="Interior">Interior</option>
                <option value="Exterior">Exterior</option>
                <option value="Events">Events</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">Image URL</label>
              <input
                type="text"
                value={newItem.imageUrl || ''}
                onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })}
                className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-[#1A1A1A] text-[#F9F7F2] font-bold text-xs uppercase cursor-pointer"
            >
              Upload / Add Image
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-[#F9F7F2] border border-[#1A1A1A]/20 text-[#1A1A1A] text-xs font-bold uppercase cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map(item => (
          <div
            key={item.id}
            className="bg-[#E8E4D9] border border-[#1A1A1A]/15 overflow-hidden group relative flex flex-col justify-between"
          >
            <div className="aspect-4/3 overflow-hidden relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 bg-[#1A1A1A] text-[#F9F7F2] text-[10px] font-bold px-2 py-0.5 uppercase">
                {item.category}
              </span>
            </div>
            <div className="p-4 flex items-center justify-between gap-2 border-t border-[#1A1A1A]/10">
              <span className="font-serif text-sm font-bold text-[#1A1A1A] truncate">{item.title}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 bg-[#C62828]/10 hover:bg-[#C62828]/20 border border-[#C62828] text-[#C62828] cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
