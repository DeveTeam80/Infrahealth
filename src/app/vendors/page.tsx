import type { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';
import VendorsClient from './VendorsClient';
export const metadata: Metadata = {
  title: pageMetadata.vendors.title,
  description: pageMetadata.vendors.description,
  keywords: pageMetadata.vendors.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}/vendors`,
  },
  openGraph: {
    title: pageMetadata.vendors.title,
    description: pageMetadata.vendors.description,
    url: `${siteConfig.siteUrl}/vendors`,
  },
};
export default function VendorsPage() {
  return <VendorsClient />;
}