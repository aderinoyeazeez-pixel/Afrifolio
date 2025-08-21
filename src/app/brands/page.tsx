import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({ where: { status: "APPROVED" }, orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Brands</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {brands.map((b) => (
          <Link key={b.id} href={"/brand/" + b.slug} className="card hover:bg-neutral-900 transition">
            <div className="h-40 rounded-xl bg-neutral-800 mb-3 flex items-center justify-center text-neutral-500">
              {b.name}
            </div>
            <div className="space-y-1">
              <div className="font-medium">{b.name}</div>
              {b.country && <div className="text-sm text-neutral-400">{b.city ? b.city + ", " : ""}{b.country}</div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
