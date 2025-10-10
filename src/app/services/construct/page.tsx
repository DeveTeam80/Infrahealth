import type { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';
import ConstructClient from './ConstructClient';
export const metadata: Metadata = {
  title: pageMetadata.servicesConstruct.title,
  description: pageMetadata.servicesConstruct.description,
  keywords: pageMetadata.servicesConstruct.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}/services/construct`,
  },
};
export default function ConstructPage() {
  return <ConstructClient />;
}