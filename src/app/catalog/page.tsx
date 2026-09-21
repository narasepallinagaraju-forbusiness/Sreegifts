import type { Metadata } from "next";
import { CatalogueView } from "@/components/catalogue";

export const metadata: Metadata = { title: "Catalogue", description: "Browse handmade resin art by category, finish and occasion." };

export default function CatalogPage() { return <main><section className="catalogue-view"><div className="section-intro"><div><span className="eyebrow">The catalogue</span><h1>Find your piece.</h1></div><p>Browse handmade resin art for gifting, preserving, decorating and celebrating. Product images are placeholders for now and can be replaced with your own collection later.</p></div><CatalogueView /></section></main>; }
