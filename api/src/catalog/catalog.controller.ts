import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { PaginationDto } from './dto/pagination.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  // GET /catalog/categories
  @Get('categories')
  getCategories() {
    return this.catalog.getCategories();
  }

  // GET /catalog/categories/:categorySlug/subcategories
  @Get('categories/:categorySlug/subcategories')
  getSubcategories(@Param('categorySlug') categorySlug: string) {
    return this.catalog.getSubcategoriesByCategorySlug(categorySlug);
  }

  // GET /catalog/categories/:categorySlug/subcategories/:subcategorySlug/products?limit=12&cursor=...
  @Get('categories/:categorySlug/subcategories/:subcategorySlug/products')
  getProducts(
    @Param('categorySlug') categorySlug: string,
    @Param('subcategorySlug') subcategorySlug: string,
    @Query() q: PaginationDto,
  ) {
    return this.catalog.getProductsBySubcategorySlug(
      categorySlug,
      subcategorySlug,
      q,
    );
  }

  // GET /catalog/products/:productSlug
  @Get('products/:productSlug')
  getProduct(@Param('productSlug') productSlug: string) {
    return this.catalog.getProductDetail(productSlug);
  }
}
