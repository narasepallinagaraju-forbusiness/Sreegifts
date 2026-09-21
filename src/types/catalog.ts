export type ProductStatus = "active" | "draft";
export type ProductCategory = "jewellery" | "preservation" | "decorative" | "magnets" | "pooja" | "gift-sets";

export interface ProductImage {
  src: string;
  alt: string;
  tone: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  value: string;
}

export interface CustomizationOption {
  id: string;
  label: string;
  type: "text" | "select";
  required?: boolean;
  choices?: string[];
  placeholder?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  modelId: string;
  categoryId: ProductCategory;
  categoryName: string;
  shortDescription: string;
  description: string;
  materials: string[];
  finish: string;
  dimensions: string;
  suitableFor: string[];
  careInstructions: string;
  images: ProductImage[];
  variants: ProductVariant[];
  customizationOptions: CustomizationOption[];
  tags: string[];
  occasionIds: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  status: ProductStatus;
}

export interface Category {
  id: ProductCategory;
  slug: string;
  name: string;
  eyebrow: string;
  accent: string;
  image: ProductImage;
}

export interface Occasion {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  accent: string;
  image: ProductImage;
  productIds: string[];
}

export interface CatalogFilters {
  query?: string;
  category?: ProductCategory;
  occasion?: string;
}

export interface InquirySelection {
  productName: string;
  modelId: string;
  variant?: string;
  notes?: string;
}
