// Identificadores y helpers mínimos
export type ID = string;
export type ISODate = string; // e.g., "2025-09-12T10:20:30.000Z"

// ===== Category =====
export interface Category {
  id: ID;
  name: string;
  slug: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  isActive: boolean;
  createdAt: ISODate;
  updatedAt: ISODate;
}

// ===== Subcategory =====
export interface Subcategory {
  id: ID;
  name: string;
  slug: string;
  categoryId: ID;
  imageUrl?: string | null;
  imageAlt?: string | null;
  isActive: boolean;
  createdAt: ISODate;
  updatedAt: ISODate;
}

// ===== Product =====
export interface ProductImage {
  id: ID;
  url: string;
  alt?: string | null;
  sortOrder?: number | null;
}

export type ProductAttributes = {
  sizes?: string[];
  colors?: string[];
  material?: string | null;
  dimensions?: {
    depthMm?: number;
    widthMm?: number;
    heightMm?: number;
  } | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  categoryId: string;
  subcategoryId: string | null;
  images?: ProductImage[];
  attributes?: ProductAttributes;    // 👈 nuevo
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
