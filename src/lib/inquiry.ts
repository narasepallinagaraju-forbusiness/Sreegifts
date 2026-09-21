import type { InquirySelection } from "@/types/catalog";

const placeholderNumber = "919999999999";

export function buildInquiryMessage(selection: InquirySelection, pageUrl: string, imageUrl?: string) {
  const lines = [
    "Hello, I would like to enquire about this resin art piece.",
    `Product: ${selection.productName}`,
    `Model ID: ${selection.modelId}`,
    selection.variant ? `Variant: ${selection.variant}` : "",
    selection.notes ? `Customization notes: ${selection.notes}` : "",
    `Product page: ${pageUrl}`,
    imageUrl ? `Product image: ${imageUrl}` : "",
    `Inquiry reference: RA-${Date.now().toString(36).toUpperCase()}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildWhatsAppUrl(selection: InquirySelection, pageUrl: string, imageUrl?: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || placeholderNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(buildInquiryMessage(selection, pageUrl, imageUrl))}`;
}
