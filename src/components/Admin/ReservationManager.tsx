import React, { useState } from 'react';
import { Reservation } from '../../types';
import { Search, CheckCircle2, XCircle, Clock, Trash2, Phone, Mail } from 'lucide-react';

interface ReservationManagerProps {
  reservations: Reservation[];
  onRefresh: () => void;
}

export const ReservationManager: React.FC<ReservationManagerProps> = ({ reservations, onRefresh }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredReservations = reservations.filter(res => {
    const matchesStatus = filterStatus === 'All' || res.status === filterStatus;
    const matchesQuery =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) onRefresh();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this reservation entry?')) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
      if (res.ok) onRefresh();
    } catch (err) {
      console.error('Failed to delete reservation:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Reservation Management</h2>
          <p className="text-xs text-[#1A1A1A]/60 font-medium">Review table requests, approve or reject, and contact customers.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#E8E4D9] p-4 border border-[#1A1A1A]/15">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Pending', 'Approved', 'Rejected', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs uppercase font-bold cursor-pointer transition-colors ${
                filterStatus === st
                  ? 'bg-[#1A1A1A] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1A1A1A] border border-[#1A1A1A]/20 hover:bg-[#E8E4D9]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#1A1A1A]/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name or phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 pl-8 pr-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
          />
        </div>
      </div>

      {/* Reservation Table */}
      <div className="bg-[#E8E4D9] border border-[#1A1A1A]/15 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1A1A1A] text-[#F9F7F2] uppercase">
            <tr>
              <th className="p-3">Guest Details</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Party Size</th>
              <th className="p-3">Special Request</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]/10 text-[#1A1A1A]">
            {filteredReservations.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-[#1A1A1A]/50 italic">
                  No reservations found.
                </td>
              </tr>
            ) : (
              filteredReservations.map(res => (
                <tr key={res.id} className="hover:bg-[#F9F7F2]/60 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-[#1A1A1A]">{res.name}</div>
                    <div className="text-[10px] text-[#1A1A1A]/60 flex items-center gap-2 mt-0.5">
                      <a href={`tel:${res.phone}`} className="hover:text-[#556B2F] flex items-center gap-1 font-semibold">
                        <Phone className="w-3 h-3 text-[#556B2F]" /> {res.phone}
                      </a>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-[#1A1A1A]">{res.date}</div>
                    <div className="text-[10px] text-[#556B2F] font-semibold">{res.time}</div>
                  </td>
                  <td className="p-3 font-bold text-[#1A1A1A]">{res.guests} Guests</td>
                  <td className="p-3 max-w-xs text-[10px] italic text-[#1A1A1A]/70">
                    {res.specialRequest || 'None'}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                        res.status === 'Approved'
                          ? 'bg-[#2A5C20]/15 text-[#2A5C20] border border-[#2A5C20]/40'
                          : res.status === 'Pending'
                          ? 'bg-[#556B2F]/15 text-[#556B2F] border border-[#556B2F]/40'
                          : res.status === 'Rejected'
                          ? 'bg-[#C62828]/15 text-[#C62828] border border-[#C62828]/40'
                          : 'bg-[#1A1A1A]/10 text-[#1A1A1A]'
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1.5">
                    <select
                      value={res.status}
                      onChange={e => handleStatusChange(res.id, e.target.value)}
                      className="bg-[#F9F7F2] border border-[#1A1A1A]/20 text-[10px] text-[#1A1A1A] p-1 font-semibold"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approve</option>
                      <option value="Rejected">Reject</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button
                      onClick={() => handleDelete(res.id)}
                      className="p-1 bg-[#C62828]/10 hover:bg-[#C62828]/20 border border-[#C62828] text-[#C62828] cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
