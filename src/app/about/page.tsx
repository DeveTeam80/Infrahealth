import type { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  keywords: pageMetadata.about.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
  },
};

export default function AboutPage() {
  return <AboutClient />;
}