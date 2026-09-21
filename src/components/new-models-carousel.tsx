"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { products } from "@/data/mock-catalog";
import { ProductVisual } from "@/components/site-shell";

export function NewModelsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const newModels = products.filter((product) => product.isNewArrival).slice(0, 5);

  function moveTrack(direction: number) {
    trackRef.current?.scrollBy({ left: direction * 390, behavior: "smooth" });
  }

  return <section className="new-models-section" aria-labelledby="new-models-title">
    <div className="new-models-heading">
      <div><span className="eyebrow">Just poured</span><h2 id="new-models-title">New models <em>to fall for.</em></h2></div>
      <div className="new-models-controls"><button className="carousel-button" onClick={() => moveTrack(-1)} aria-label="Previous new models"><ArrowLeft size={18} /></button><button className="carousel-button carousel-button-active" onClick={() => moveTrack(1)} aria-label="Next new models"><ArrowRight size={18} /></button></div>
    </div>
    <div className="new-models-stage">
      <div className="new-models-intro"><span className="eyebrow">The latest edit</span><Link href="/catalog" className="text-link">See the full catalogue <ArrowUpRight size={15} /></Link></div>
      <div className="new-models-track" ref={trackRef} tabIndex={0} aria-label="New resin art models">
        {newModels.map((product) => <Link className="new-model-card" href={`/products/${product.slug}`} key={product.id}><ProductVisual storageId={product.id} src={product.images[0]?.src} tone={product.images[0]?.tone} alt={product.images[0]?.alt ?? product.name} /><div className="new-model-card-copy"><span className="new-model-category">{product.categoryName}</span><h3>{product.name}</h3><span className="new-model-link">View model <ArrowUpRight size={14} /></span></div></Link>)}
      </div>
    </div>
  </section>;
}
