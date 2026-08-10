import React, { useState } from 'react';
import { MenuItem } from '../../types';
import { Plus, Edit3, Trash2, Check, X, Image as ImageIcon } from 'lucide-react';

interface MenuManagerProps {
  menuItems: MenuItem[];
  onRefresh: () => void;
}

export const MenuManager: React.FC<MenuManagerProps> = ({ menuItems, onRefresh }) => {
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialForm: Partial<MenuItem> = {
    name: '',
    category: 'Coffee',
    description: '',
    price: 'BDT 300',
    imageUrl: '/images/torrazur-04.jpg',
    isAvailable: true,
    isFeatured: false,
    sortOrder: menuItems.length + 1,
  };

  const handleSave = async (itemData: Partial<MenuItem>) => {
    setLoading(true);
    try {
      const isEdit = !!itemData.id;
      const url = isEdit ? `/api/menu/${itemData.id}` : '/api/menu';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });

      if (res.ok) {
        setEditingItem(null);
        setIsCreating(false);
        onRefresh();
      }
    } catch (err) {
      console.error('Failed to save menu item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      if (res.ok) onRefresh();
    } catch (err) {
      console.error('Failed to delete menu item:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Menu Management</h2>
          <p className="text-xs text-[#1A1A1A]/60 font-medium">Add, edit, or delete items, prices, and categories.</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(initialForm);
            setIsCreating(true);
          }}
          className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#3D2B1F] text-[#F9F7F2] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E8D4BE]" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Edit / Create Form Modal */}
      {editingItem && (
        <div className="bg-[#E8E4D9] border border-[#1A1A1A]/20 p-6 space-y-4 shadow-xl">
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
            {isCreating ? 'Add New Menu Item' : 'Edit Menu Item'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">Item Name</label>
              <input
                type="text"
                value={editingItem.name || ''}
                onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">Category</label>
              <select
                value={editingItem.category || 'Coffee'}
                onChange={e => setEditingItem({ ...editingItem, category: e.target.value as any })}
                className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
              >
                <option value="Coffee">Coffee</option>
                <option value="Bakery">Bakery</option>
                <option value="Food">Food</option>
                <option value="Specialties">Specialties</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">Price (e.g. BDT 350)</label>
              <input
                type="text"
                value={editingItem.price || ''}
                onChange={e => setEditingItem({ ...editingItem, price: e.target.value })}
                className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">Image URL</label>
              <input
                type="text"
                value={editingItem.imageUrl || ''}
                onChange={e => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] uppercase block mb-1">Description</label>
            <textarea
              rows={2}
              value={editingItem.description || ''}
              onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
              className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3 py-2 text-xs text-[#1A1A1A]"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-xs text-[#1A1A1A] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={editingItem.isAvailable !== false}
                onChange={e => setEditingItem({ ...editingItem, isAvailable: e.target.checked })}
              />
              Available Today
            </label>

            <label className="flex items-center gap-2 text-xs text-[#1A1A1A] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={editingItem.isFeatured === true}
                onChange={e => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
              />
              Featured Item
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => handleSave(editingItem)}
              disabled={loading}
              className="px-4 py-2 bg-[#1A1A1A] text-[#F9F7F2] font-bold text-xs uppercase cursor-pointer"
            >
              Save Item
            </button>
            <button
              onClick={() => {
                setEditingItem(null);
                setIsCreating(false);
              }}
              className="px-4 py-2 bg-[#F9F7F2] border border-[#1A1A1A]/20 text-[#1A1A1A] text-xs font-bold uppercase cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Menu Item Table */}
      <div className="bg-[#E8E4D9] border border-[#1A1A1A]/15 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1A1A1A] text-[#F9F7F2] uppercase">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]/10 text-[#1A1A1A]">
            {menuItems.map(item => (
              <tr key={item.id} className="hover:bg-[#F9F7F2]/60 transition-colors">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-10 h-10 object-cover border border-[#1A1A1A]/15"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-bold text-[#1A1A1A]">{item.name}</div>
                    <div className="text-[10px] text-[#1A1A1A]/60 line-clamp-1">{item.description}</div>
                  </div>
                </td>
                <td className="p-3 font-bold text-[#556B2F]">{item.category}</td>
                <td className="p-3 font-bold text-[#1A1A1A]">{item.price}</td>
                <td className="p-3 font-semibold">
                  {item.isAvailable ? (
                    <span className="text-[#2A5C20]">Available</span>
                  ) : (
                    <span className="text-[#C62828]">Sold Out</span>
                  )}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setIsCreating(false);
                    }}
                    className="p-1.5 bg-[#F9F7F2] hover:bg-[#E8E4D9] border border-[#1A1A1A]/20 text-[#1A1A1A] cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 bg-[#C62828]/10 hover:bg-[#C62828]/20 border border-[#C62828] text-[#C62828] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
