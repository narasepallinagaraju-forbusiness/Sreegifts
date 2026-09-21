"use client";

/* Temporary blob previews cannot use next/image until they are persisted. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Check, ImagePlus, LayoutDashboard, Package, Tag, Upload, X } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import { categories, occasions, products } from "@/data/mock-catalog";

type AssetTarget = "product" | "category" | "occasion";
interface UploadItem { id: string; file: File; previewUrl: string; dataUrl: string; }

const targetOptions: Record<AssetTarget, string> = { product: "Product image", category: "Category image", occasion: "Occasion banner" };

export function AdminWorkspace() {
  const [target, setTarget] = useState<AssetTarget>("product");
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? "");
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [saved, setSaved] = useState(false);

  const targetRecords = useMemo(() => target === "product" ? products : target === "category" ? categories : occasions, [target]);

  function handleTargetChange(nextTarget: AssetTarget) {
    setTarget(nextTarget);
    setSelectedId(target === nextTarget ? selectedId : targetRecords[0]?.id ?? "");
    setSaved(false);
  }

  function addFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith("image/"));
    Promise.all(files.map((file) => new Promise<UploadItem>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ id: `${file.name}-${file.lastModified}`, file, previewUrl: URL.createObjectURL(file), dataUrl: String(reader.result) });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }))).then((items) => setUploads((current) => [...current, ...items]));
    event.target.value = "";
  }

  function removeUpload(id: string) {
    setUploads((current) => {
      const item = current.find((upload) => upload.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return current.filter((upload) => upload.id !== id);
    });
  }

  function saveDemoUpload() {
    if (target === "product") {
      const savedAssets = JSON.parse(localStorage.getItem("mosaic-resin-assets") ?? "{}") as Record<string, string[]>;
      savedAssets[`product:${selectedId}`] = uploads.map((upload) => upload.dataUrl);
      localStorage.setItem("mosaic-resin-assets", JSON.stringify(savedAssets));
      window.dispatchEvent(new Event("mosaic-assets-updated"));
    }
    setSaved(true);
  }

  return <main className="admin-page"><div className="admin-topbar"><div><span className="eyebrow">Workspace / local demo</span><h1>Catalogue manager</h1></div><Link href="/" className="button button-light">View catalogue <span className="button-icon button-icon-dark">↗</span></Link></div><div className="admin-notice"><Upload size={18} /><span>Demo mode: selected product images are saved in this browser. Permanent uploads will connect to S3 through the future admin API.</span></div><div className="admin-layout"><aside className="admin-sidebar"><span className="admin-nav-label">Manage</span><a className="admin-nav-link active" href="#overview"><LayoutDashboard size={17} /> Overview</a><a className="admin-nav-link" href="#products"><Package size={17} /> Products <span>{products.length}</span></a><a className="admin-nav-link" href="#categories"><Tag size={17} /> Categories <span>{categories.length}</span></a><a className="admin-nav-link" href="#occasions"><Tag size={17} /> Occasions <span>{occasions.length}</span></a><span className="admin-nav-label admin-nav-label-spaced">Future</span><span className="admin-nav-muted">Leads</span><span className="admin-nav-muted">Inquiry events</span><span className="admin-nav-muted">Roles & audit logs</span></aside><div className="admin-content" id="overview"><div className="admin-stats"><div className="admin-stat"><span>Products</span><strong>{products.length}</strong><small>Mock records ready</small></div><div className="admin-stat"><span>Categories</span><strong>{categories.length}</strong><small>Core collections</small></div><div className="admin-stat"><span>Occasions</span><strong>{occasions.length}</strong><small>Curated edits</small></div><div className="admin-stat"><span>New models</span><strong>{products.filter((product) => product.isNewArrival).length}</strong><small>Fresh catalogue items</small></div></div><section className="admin-panel upload-panel"><div className="admin-panel-heading"><div><span className="eyebrow">Asset library</span><h2>Add your product images</h2></div><span className="admin-count">{uploads.length} selected</span></div><div className="upload-form-grid"><label className="admin-field"><span>What are you uploading?</span><select value={target} onChange={(event) => handleTargetChange(event.target.value as AssetTarget)}>{Object.entries(targetOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="admin-field"><span>Attach to</span><select value={selectedId} onChange={(event) => { setSelectedId(event.target.value); setSaved(false); }}>{targetRecords.map((record) => <option key={record.id} value={record.id}>{record.name}</option>)}</select></label></div><label className="upload-dropzone"><input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={addFiles} /><ImagePlus size={25} /><strong>Choose images from your computer</strong><span>PNG, JPG or WebP · Multiple files allowed</span></label>{uploads.length > 0 && <div className="upload-list">{uploads.map((upload) => <div className="upload-item" key={upload.id}><img src={upload.previewUrl} alt={upload.file.name} /><div><strong>{upload.file.name}</strong><span>{Math.round(upload.file.size / 1024)} KB · Ready for {targetOptions[target].toLowerCase()}</span></div><button className="icon-button" onClick={() => removeUpload(upload.id)} aria-label={`Remove ${upload.file.name}`}><X size={17} /></button></div>)}</div>}<div className="upload-actions"><button className="button button-dark" disabled={!uploads.length} onClick={saveDemoUpload}><Check size={16} /> {saved ? "Saved for this demo" : "Save selected images"}</button><span>Nothing is sent to a server yet.</span></div></section><section className="admin-panel records-panel" id="products"><div className="admin-panel-heading"><div><span className="eyebrow">Current catalogue</span><h2>All available objects</h2></div><span className="admin-count">{products.length} products</span></div><div className="admin-table"><div className="admin-table-row admin-table-header"><span>Object</span><span>Type</span><span>Model ID</span><span>Status</span></div>{products.map((product) => <div className="admin-table-row" key={product.id}><span className="admin-object"><span className={`admin-dot tone-${product.images[0]?.tone}`} />{product.name}</span><span>{product.categoryName}</span><span>{product.modelId}</span><span className="status-active">{product.status}</span></div>)}</div></section></div></div></main>;
}
