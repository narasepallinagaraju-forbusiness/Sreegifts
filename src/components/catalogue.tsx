"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { categories, products } from "@/data/mock-catalog";
import type { ProductCategory } from "@/types/catalog";
import { ProductCard } from "@/components/site-shell";

export function CatalogueView({ initialCategory, initialQuery }: { initialCategory?: ProductCategory; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [category, setCategory] = useState<ProductCategory | "all">(initialCategory ?? "all");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => products.filter((product) => {
    const matchesQuery = `${product.name} ${product.shortDescription} ${product.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === "all" || product.categoryId === category);
  }).sort((a, b) => sort === "new" ? Number(b.isNewArrival) - Number(a.isNewArrival) : Number(b.isFeatured) - Number(a.isFeatured)), [category, query, sort]);

  return <div className="catalogue-view"><div className="catalogue-controls"><div className="search-field"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pieces, memories, occasions..." aria-label="Search products" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}</div><button className="filter-trigger" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={17} /> Filters</button><label className="sort-select">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="new">New arrivals</option></select></label></div><div className="catalogue-layout"><aside className={`filter-panel ${showFilters ? "filter-panel-open" : ""}`}><div className="filter-panel-head"><span className="eyebrow">Refine</span><button className="filter-close" onClick={() => setShowFilters(false)} aria-label="Close filters"><X size={18} /></button></div><span className="filter-label">Category</span><button className={category === "all" ? "filter-option active" : "filter-option"} onClick={() => setCategory("all")}>All pieces <span>{products.length}</span></button>{categories.slice(0, 5).map((item) => <button key={item.id} className={category === item.id ? "filter-option active" : "filter-option"} onClick={() => setCategory(item.id)}>{item.name}<span>{products.filter((product) => product.categoryId === item.id).length}</span></button>)}<div className="filter-note"><Filter size={16} /><span>Every piece is handmade or adapted around your details. Ask us what is possible.</span></div></aside><div className="catalogue-results"><div className="results-head"><span>{filtered.length} pieces</span>{(query || category !== "all") && <button className="clear-filter" onClick={() => { setQuery(""); setCategory("all"); }}>Clear all</button>}</div>{filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span className="eyebrow">Nothing here yet</span><h2>Try another little search.</h2><p>We may not have that phrase in the preview catalogue, but we can often make something custom.</p><button className="button button-dark" onClick={() => { setQuery(""); setCategory("all"); }}>Show all pieces</button></div>}</div></div></div>;
}

export function InquiryButton({ productName, modelId }: { productName: string; modelId: string }) {
  const href = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}?text=${encodeURIComponent(`Hello, I would like to enquire about ${productName} (${modelId}).`)}`;
  return <a className="button button-dark inquiry-button" href={href} target="_blank" rel="noreferrer"><span>Inquire on WhatsApp</span><span className="button-icon">↗</span></a>;
}
