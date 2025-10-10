import OperateClient from './OperateClient';
import type { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: pageMetadata.servicesOperate.title,
  description: pageMetadata.servicesOperate.description,
  keywords: pageMetadata.servicesOperate.keywords,
  alternates: {
    canonical: `${siteConfig.siteUrl}/services/operate`,
  },
};


export default function OperatePage() {
  return <OperateClient />;
}