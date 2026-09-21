import Link from "next/link";

/* Local catalogue preview images are served directly from public/images. */
/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { categories, occasions, products } from "@/data/mock-catalog";
import { OccasionStrip, ProductCard, SectionIntro } from "@/components/site-shell";
import { NewModelsCarousel } from "@/components/new-models-carousel";

export default function Home() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  return <main>
    <NewModelsCarousel />
    <section className="categories-section"><SectionIntro eyebrow="The collection" title="Start with what you’re drawn to." link="View all pieces" /><div className="category-grid">{categories.slice(0, 5).map((category) => <Link href={`/categories/${category.slug}`} key={category.id} className={`category-tile tone-${category.accent}`}><img className="category-tile-image" src={category.image.src} alt={category.image.alt} /><div className="tile-top"><span className="eyebrow">0{categories.indexOf(category) + 1}</span><span className="tile-icon"><ArrowUpRight size={15} /></span></div><div><h3>{category.name}</h3></div></Link>)}</div></section>
    <OccasionStrip />
    <section className="featured-section"><SectionIntro eyebrow="A few favourites" title="Pieces with a little more feeling." link="See all products" /><div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="occasion-strip"><div className="occasion-strip-intro"><span className="eyebrow">A little inspiration</span><h2>For the stories still becoming.</h2></div><div className="occasion-links">{occasions.slice(4).map((occasion) => <Link key={occasion.id} href={`/occasions/${occasion.slug}`} className={`occasion-link tone-${occasion.accent}`}><span>{occasion.name}</span><ArrowUpRight size={17} /></Link>)}</div></section>
  </main>;
}
