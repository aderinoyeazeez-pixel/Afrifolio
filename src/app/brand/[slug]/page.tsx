import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BrandDetail({ params }: { params: { slug: string } }) {
  const brand = await prisma.brand.findUnique({ where: { slug: params.slug } });
  if (!brand || brand.status !== "APPROVED") {
    return <div>Brand not found</div>;
  }
  const products = await prisma.product.findMany({ where: { brandId: brand.id } });
  const reviews = await prisma.review.findMany({ where: { brandId: brand.id }, orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-neutral-800 h-56 flex items-center justify-center">
        <div className="text-2xl">{brand.name}</div>
      </div>
      <p className="text-neutral-300">{brand.story}</p>

      <h2 className="text-xl font-semibold">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <Link key={p.id} href={"/product/" + p.slug} className="card hover:bg-neutral-900 transition">
            <div className="h-40 rounded-xl bg-neutral-800 mb-3 flex items-center justify-center text-neutral-500">
              {p.name}
            </div>
            <div className="space-y-1">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-neutral-400">NGN {(p.price/100).toLocaleString()}</div>
            </div>
          </Link>
        ))}
      </div>

      <h3 className="text-lg font-semibold">Reviews</h3>
      <div className="space-y-3">
        {reviews.length === 0 && <div className="text-neutral-400">No reviews yet</div>}
        {reviews.map(r => (
          <div key={r.id} className="card">
            <div className="text-sm text-neutral-400">{new Date(r.createdAt).toLocaleDateString()}</div>
            <div className="font-medium">Rating {r.rating}/5</div>
            {r.comment && <div className="text-neutral-300">{r.comment}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
