import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        nameEn: true,
        slug: true,
        slugEn: true,
        imageUrl: true,
        imageAlt: true,
      },
    });
  }

  async getSubcategoriesByCategorySlug(categorySlug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
      select: { id: true },
    });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    return this.prisma.subcategory.findMany({
      where: { categoryId: category.id, isActive: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        nameEn: true,
        slug: true,
        slugEn: true,
        imageUrl: true,
        imageAlt: true,
      },
    });
  }

  async getProductsBySubcategorySlug(
    categorySlug: string,
    subcategorySlug: string,
    q: PaginationDto,
  ) {
    // Validar que subcategory pertenece a category
    const sub = await this.prisma.subcategory.findFirst({
      where: { slug: subcategorySlug, category: { slug: categorySlug } },
      select: { id: true },
    });
    if (!sub) throw new NotFoundException('Subcategoría no encontrada');

    const take = Math.min(q.limit ?? 12, 48);
    const cursor = q.cursor ? { id: q.cursor } : undefined;

    const items = await this.prisma.product.findMany({
      where: { subcategoryId: sub.id, isActive: true },
      orderBy: { name: 'asc' },
      take: take + 1, // para calcular nextCursor
      ...(cursor ? { cursor, skip: 1 } : {}),
      select: {
        id: true,
        name: true,
        nameEn: true,
        slug: true,
        slugEn: true,
        description: true,
        descriptionEn: true,
        attributes: true,
        productImages: {
          orderBy: { sortOrder: 'asc' },
          select: { url: true, alt: true, sortOrder: true },
        },
      },
    });

    let nextCursor: string | null = null;
    if (items.length > take) {
      const next = items.pop();
      nextCursor = next!.id;
    }
    return { items, nextCursor };
  }

  async getProductDetail(productSlug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug: productSlug, isActive: true },
      select: {
        id: true,
        name: true,
        nameEn: true,
        slug: true,
        slugEn: true,
        description: true,
        descriptionEn: true,
        attributes: true,
        subcategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: { select: { id: true, name: true, slug: true } },
          },
        },
        productImages: {
          orderBy: { sortOrder: 'asc' },
          select: { url: true, alt: true, sortOrder: true },
        },
      },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }
}
