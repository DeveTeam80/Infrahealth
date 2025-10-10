
import type { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';
import ConsultClient from './ConsultClient';
export const metadata: Metadata = {
  title: pageMetadata.servicesConsult.title,
  description: pageMetadata.servicesConsult.description,
  keywords: pageMetadata.servicesConsult.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}/services/consult`,
  },
};

export default function ConsultPage() {
  return <ConsultClient />;
}