import { companyPages } from "../../../lib/company-data";
import CompanyDetailClient from "./CompanyDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return companyPages.map((page) => ({ slug: page.slug }));
}

export default function CompanyDetailPage() {
  return <CompanyDetailClient />;
}
