import type { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';
import ProductClient from './ProductClient';

export const metadata: Metadata = {
  title: pageMetadata.products.title,
  description: pageMetadata.products.description,
  keywords: pageMetadata.products.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}/products`,
  },
};
export default function ProductsPage() {
  return <ProductClient />;
}