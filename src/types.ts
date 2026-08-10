export interface MenuItem {
  id: string;
  name: string;
  category: 'Coffee' | 'Bakery' | 'Food' | 'Specialties';
  description: string;
  price: string; // e.g. "BDT 350" or "350"
  imageUrl: string;
  isAvailable: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Café' | 'Bakery' | 'Coffee' | 'Food' | 'Interior' | 'Exterior' | 'Events';
  imageUrl: string;
  sortOrder: number;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  createdAt: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  category: string;
  address: string;
  addressArea: string;
  city: string;
  country: string;
  serviceArea: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  seoTitle: string;
  seoDescription: string;
  googleMapsUrl: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
