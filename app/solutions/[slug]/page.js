import { solutions } from "../../../lib/solutions-data";
import SolutionDetailClient from "./SolutionDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export default function SolutionDetailPage() {
  return <SolutionDetailClient />;
}
