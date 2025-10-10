import type { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';
import CareersClient from './CareersClient';
export const metadata: Metadata = {
  title: pageMetadata.careers.title,
  description: pageMetadata.careers.description,
  keywords: pageMetadata.careers.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}/careers`,
  },
};
export default function CareersPage() {
  return <CareersClient />;
}