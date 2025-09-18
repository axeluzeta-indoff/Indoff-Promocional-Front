export type CategoryDTO = {
  id: string; name: string; slug: string;
  imageUrl?: string | null; imageAlt?: string | null;
  isActive?: boolean | null;
  createdAt?: string | null; updatedAt?: string | null;
};

export type SubcategoryDTO = {
  id: string; name: string; slug: string; // (si tu back no manda categoryId, lo omitimos)
  imageUrl?: string | null; imageAlt?: string | null;
  isActive?: boolean | null;
  createdAt?: string | null; updatedAt?: string | null;
};

// LISTA (hover)
export type ProductListItemDTO = {
  id: string; name: string; slug: string;
  imageUrl?: string | null; imageAlt?: string | null;
  // estos no vienen en tu lista; los dejamos opcionales por si luego los agregas
  description?: string | null;
  categoryId?: string | null; subcategoryId?: string | null;
  isActive?: boolean | null;
  createdAt?: string | null; updatedAt?: string | null;
};

// DETALLE
export type ProductDetailDTO = {
  id: string; name: string; slug: string;
  description?: string | null;

  images?: { url: string; alt?: string | null; sortOrder?: number | null }[];

  attributes?: {
    sizes?: string[];
    colors?: string[];
    material?: string | null;
    dimensions?: { depthMm?: number; widthMm?: number; heightMm?: number };
  };

  subcategory?: { id: string; name: string; slug: string } | null;
  category?: { id: string; name: string; slug: string } | null;

  isActive?: boolean | null;
  createdAt?: string | null; updatedAt?: string | null;
};

