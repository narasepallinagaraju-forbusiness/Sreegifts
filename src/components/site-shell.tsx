"use client";

/* Product uploads are browser data URLs in the UI-only phase. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, MessageCircle, Search, Sparkles, X } from "lucide-react";
import { categories, occasions } from "@/data/mock-catalog";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="announcement"><span>Made slowly, personalised thoughtfully.</span><Link href="/occasions/diwali">Explore festive pieces <ArrowUpRight size={14} /></Link></div>
      <header className="site-header">
        <div className="header-inner">
          <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={22} /></button>
          <Link href="/" className="brand"><span className="brand-mark"><Sparkles size={18} /></span><span>mosaic<span className="brand-dot">.</span>resin</span></Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/catalog">Shop all</Link>
            <Link href="/categories/preservation">Preservation</Link>
            <Link href="/categories/pooja">Pooja</Link>
            <Link href="/occasions/diwali">Occasions</Link>
          </nav>
          <div className="header-actions"><Link href="/catalog" className="icon-button" aria-label="Search catalogue"><Search size={20} /></Link><Link href="/inquire" className="inquiry-pill"><MessageCircle size={16} /> <span>Inquire</span></Link></div>
        </div>
      </header>
      {open && <div className="mobile-menu-backdrop" onClick={() => setOpen(false)}><aside className="mobile-menu" onClick={(event) => event.stopPropagation()}><div className="mobile-menu-head"><span className="eyebrow">Browse mosaic.resin</span><button className="icon-button" aria-label="Close menu" onClick={() => setOpen(false)}><X size={22} /></button></div><nav><Link href="/catalog" onClick={() => setOpen(false)}>Shop all</Link>{categories.slice(0, 5).map((category) => <Link key={category.id} href={`/categories/${category.slug}`} onClick={() => setOpen(false)}>{category.name}</Link>)}<Link href="/occasions/diwali" onClick={() => setOpen(false)}>Shop by occasion</Link></nav><div className="mobile-menu-note">Every piece is made to order or adapted around your story.</div></aside></div>}
    </>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main"><div><Link href="/" className="brand footer-brand"><span className="brand-mark"><Sparkles size={18} /></span><span>mosaic<span className="brand-dot">.</span>resin</span></Link><p className="footer-copy">Handmade resin art for the moments, spaces and people you want to keep close.</p></div><div className="footer-links"><div><span className="eyebrow">Explore</span><Link href="/catalog">All pieces</Link><Link href="/occasions/diwali">By occasion</Link><Link href="/categories/preservation">Preservation</Link></div><div><span className="eyebrow">Connect</span><Link href="/inquire">WhatsApp inquiry</Link><a href="mailto:hello@mosaicresin.example">hello@mosaicresin.example</a><span>Instagram placeholder</span></div></div></div><div className="footer-bottom"><span>© 2026 mosaic.resin · Catalogue preview</span><span>Made for meaningful gifting</span></div></footer>;
}

export function ProductVisual({ tone = "sage", alt, large = false, storageId, src }: { tone?: string; alt: string; large?: boolean; storageId?: string; src?: string }) {
  const [photo, setPhoto] = useState<string>();
  const defaultSources: Record<string, string> = { rose: "/images/products/jewellery.jpg", sage: "/images/products/preservation.jpg", blue: "/images/products/decorative.jpg", amber: "/images/products/gifting.jpg", saffron: "/images/products/pooja.jpg", plum: "/images/products/gifting.jpg", sky: "/images/products/preservation.jpg" };
  useEffect(() => {
    if (!storageId) return;
    const readPhoto = () => {
      const assets = JSON.parse(localStorage.getItem("mosaic-resin-assets") ?? "{}") as Record<string, string[]>;
      setPhoto(assets[`product:${storageId}`]?.[0]);
    };
    readPhoto();
    window.addEventListener("mosaic-assets-updated", readPhoto);
    return () => window.removeEventListener("mosaic-assets-updated", readPhoto);
  }, [storageId]);
  const displaySource = photo || src || defaultSources[tone];
  return <div className={`product-visual tone-${tone} ${large ? "product-visual-large" : ""}`} role="img" aria-label={alt}>{displaySource && <img className="product-photo" src={displaySource} alt={alt} />}{!displaySource && <><div className="visual-shine" /><span className="visual-label">resin / made slowly</span></>}</div>;
}

export function ProductCard({ product }: { product: (typeof import("@/data/mock-catalog").products)[number] }) {
  return <article className="product-card"><Link href={`/products/${product.slug}`} className="product-card-image"><ProductVisual storageId={product.id} src={product.images[0]?.src} tone={product.images[0]?.tone} alt={product.images[0]?.alt ?? product.name} /><span className="card-arrow"><ArrowUpRight size={18} /></span>{product.isNewArrival && <span className="new-badge">New</span>}</Link><div className="product-card-body"><div className="product-card-meta"><span>{product.categoryName}</span><span>{product.modelId}</span></div><Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link><div className="product-card-foot"><span className="made-note">Made to inquire</span><span className="learn-link">View piece <ArrowUpRight size={14} /></span></div></div></article>;
}

export function SectionIntro({ eyebrow, title, copy, link, href = "/catalog" }: { eyebrow: string; title: string; copy?: string; link?: string; href?: string }) {
  return <div className="section-intro"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{copy && <p>{copy}</p>}{link && <Link href={href} className="text-link">{link} <ArrowUpRight size={15} /></Link>}</div>;
}

export function OccasionStrip() {
  return <section className="occasion-strip"><div className="occasion-strip-intro"><span className="eyebrow">Shop with a feeling</span><h2>Find the piece for the moment.</h2></div><div className="occasion-links">{occasions.slice(0, 4).map((occasion) => <Link key={occasion.id} href={`/occasions/${occasion.slug}`} className={`occasion-link tone-${occasion.accent}`}><span>{occasion.name}</span><ArrowUpRight size={17} /></Link>)}</div></section>;
}
