import { describe, expect, it } from "vitest";
import { products } from "@/data/mock-catalog";
import { filterProducts, sortFeatured } from "@/lib/catalog";

describe("catalog utilities", () => {
  it("searches product names and tags", () => {
    expect(filterProducts(products, { query: "diwali" }).some((product) => product.id === "pooja-thali")).toBe(true);
  });

  it("filters by category and occasion together", () => {
    const result = filterProducts(products, { category: "pooja", occasion: "diwali" });
    expect(result.every((product) => product.categoryId === "pooja" && product.occasionIds.includes("diwali"))).toBe(true);
  });

  it("keeps featured products first", () => {
    const result = sortFeatured(products);
    expect(result[0]?.isFeatured).toBe(true);
  });
});
