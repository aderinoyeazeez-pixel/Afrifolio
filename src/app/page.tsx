import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const featured = await prisma.brand.findMany({
    where: { featured: true, status: "APPROVED" },
    take: 3,
  });

  return (
    <div className="space-y-10">
      <section className="text-center space-y-4 my-10">
        <h1 className="text-4xl md:text-5xl font-semibold">
          The global stage for African fashion
        </h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          Curated brands, honest provenance, and a smooth path from discovery to delivery.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/brands" className="px-4 py-2 rounded-xl bg-white text-black">Explore brands</Link>
          <Link href="/creator/apply" className="px-4 py-2 rounded-xl border border-neutral-700">Creator apply</Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Featured brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((b) => (
            <Link key={b.id} href={"/brand/" + b.slug} className="card hover:bg-neutral-900 transition">
              <div className="h-44 rounded-xl bg-neutral-800 mb-3 flex items-center justify-center text-neutral-500">
                {b.heroImage ? <span>{b.name}</span> : <span>{b.name}</span>}
              </div>
              <div className="space-y-1">
                <div className="font-medium">{b.name}</div>
                {b.tagline && <div className="text-sm text-neutral-400">{b.tagline}</div>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold mb-2">Why Afrifolio</h3>
        <ul className="list-disc ml-6 text-neutral-300 space-y-1">
          <li>Story first brand portfolios, not generic grids</li>
          <li>Trust signals through reviews and visible provenance</li>
          <li>Collections that reflect culture and craft</li>
        </ul>
      </section>
    </div>
  );
}
