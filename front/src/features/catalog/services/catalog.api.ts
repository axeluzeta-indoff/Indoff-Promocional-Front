import { get } from '../../../shared/lib/http';

export type CategoryDTO = {
  id: string; name: string; slug: string;
  nameEn?: string | null; slugEn?: string | null;
  imageUrl?: string | null; imageAlt?: string | null;
};

export const getCategories = () => get<CategoryDTO[]>('/catalog/categories');
