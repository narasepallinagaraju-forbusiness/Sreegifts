import type { CatalogFilters, Product } from "@/types/catalog";

export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  const query = filters.query?.trim().toLowerCase() ?? "";
  return products.filter((product) => {
    const searchable = [product.name, product.shortDescription, product.categoryName, ...product.tags].join(" ").toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesCategory = !filters.category || product.categoryId === filters.category;
    const matchesOccasion = !filters.occasion || product.occasionIds.includes(filters.occasion);
    return matchesQuery && matchesCategory && matchesOccasion;
  });
}

export function sortFeatured(products: Product[]): Product[] {
  return [...products].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || Number(b.isNewArrival) - Number(a.isNewArrival));
}
