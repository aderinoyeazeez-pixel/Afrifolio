import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: { key?: string } }) {
  const key = process.env.ADMIN_KEY;
  if (!searchParams.key || searchParams.key !== key) {
    return <div>Access denied</div>;
  }

  const pending = await prisma.brand.findMany({ where: { status: "PENDING" } });
  const approved = await prisma.brand.findMany({ where: { status: "APPROVED" } });

  async function approve(id: string) {
    "use server";
    await prisma.brand.update({ where: { id }, data: { status: "APPROVED" } });
  }
  async function feature(id: string) {
    "use server";
    await prisma.brand.update({ where: { id }, data: { featured: true } });
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Admin</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Pending brands</h2>
        {pending.length === 0 && <div className="text-neutral-400">None</div>}
        {pending.map(b => (
          <form key={b.id} action={approve} className="card flex items-center justify-between">
            <div>
              <div className="font-medium">{b.name}</div>
              <div className="text-sm text-neutral-400">{b.slug}</div>
            </div>
            <input type="hidden" name="id" value={b.id} />
            <button className="px-3 py-1 rounded-lg bg-white text-black text-sm">Approve</button>
          </form>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Approved brands</h2>
        {approved.length === 0 && <div className="text-neutral-400">None</div>}
        {approved.map(b => (
          <form key={b.id} action={feature} className="card flex items-center justify-between">
            <div>
              <div className="font-medium">{b.name}</div>
              <div className="text-sm text-neutral-400">{b.slug}</div>
            </div>
            <input type="hidden" name="id" value={b.id} />
            <button className="px-3 py-1 rounded-lg bg-white text-black text-sm">Feature on home</button>
          </form>
        ))}
      </section>
    </div>
  );
}
