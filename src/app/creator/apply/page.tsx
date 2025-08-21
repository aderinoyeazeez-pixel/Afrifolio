import { prisma } from "@/lib/prisma";

async function createBrand(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const story = String(formData.get("story") || "").trim();
  const country = String(formData.get("country") || "").trim();
  const city = String(formData.get("city") || "").trim();

  if (!name || !slug) return;

  await prisma.brand.create({
    data: { name, slug, tagline, story, country, city, status: "PENDING" },
  });
}

export default function CreatorApplyPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Creator apply</h1>
      <form action={createBrand} className="space-y-3">
        <input name="name" placeholder="Brand name" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2" />
        <input name="slug" placeholder="Slug e.g. kente-atelier" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2" />
        <input name="tagline" placeholder="Tagline" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2" />
        <input name="country" placeholder="Country" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2" />
        <input name="city" placeholder="City" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2" />
        <textarea name="story" placeholder="Your story" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2" rows={5} />
        <button className="px-4 py-2 rounded-xl bg-white text-black">Submit</button>
      </form>
      <p className="text-sm text-neutral-400 mt-3">
        Your application enters review. Approved brands will appear on the brands page.
      </p>
    </div>
  );
}
