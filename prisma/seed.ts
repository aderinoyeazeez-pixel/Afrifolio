
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function run() {
  const brandCount = await prisma.brand.count();
  if (brandCount > 0) {
    console.log("Seed skipped: data already present");
    return;
  }

  // Demo users
  const alice = await prisma.user.create({
    data: { email: "alice@example.com", name: "Alice" },
  });
  const bob = await prisma.user.create({
    data: { email: "bob@example.com", name: "Bob" },
  });

  // Demo brands
  const kente = await prisma.brand.create({
    data: {
      name: "Kente Atelier",
      slug: "kente-atelier",
      tagline: "Weave of heritage for modern life",
      story: "Celebrating Ghanaian craftsmanship through contemporary silhouettes.",
      country: "Ghana",
      city: "Accra",
      status: "APPROVED",
      featured: true,
      heroImage: "/demo/kente-hero.jpg",
    },
  });

  const asoOke = await prisma.brand.create({
    data: {
      name: "Aso Oke Studio",
      slug: "aso-oke-studio",
      tagline: "Yoruba tradition with confident tailoring",
      story: "From Oyo to the world, handloom textures re-imagined for global wardrobes.",
      country: "Nigeria",
      city: "Lagos",
      status: "APPROVED",
      featured: false,
      heroImage: "/demo/aso-oke-hero.jpg",
    },
  });

  // Collections
  const kenteSig = await prisma.collection.create({
    data: { name: "Signature Weaves", slug: "signature-weaves", brandId: kente.id },
  });

  // Products
  await prisma.product.create({
    data: {
      brandId: kente.id,
      name: "Kente Panel Jacket",
      slug: "kente-panel-jacket",
      description: "Boxy jacket with handwoven kente panels and corozo buttons.",
      price: 95000,
      images: ["/demo/kente-jacket-1.jpg","/demo/kente-jacket-2.jpg"],
      sizes: ["S","M","L"],
      colours: ["Black","Gold"],
    },
  });

  await prisma.product.create({
    data: {
      brandId: kente.id,
      name: "Heritage Wrap Skirt",
      slug: "heritage-wrap-skirt",
      description: "Adjustable wrap skirt with selvedge detail, fully lined.",
      price: 65000,
      images: ["/demo/kente-skirt-1.jpg"],
      sizes: ["S","M","L"],
      colours: ["Indigo","Maroon"],
    },
  });

  await prisma.product.create({
    data: {
      brandId: asoOke.id,
      name: "Aso Oke Tunic",
      slug: "aso-oke-tunic",
      description: "Relaxed tunic with hand cut strips and artisanal stitching.",
      price: 48000,
      images: ["/demo/aso-oke-tunic-1.jpg"],
      sizes: ["S","M","L","XL"],
      colours: ["Cream","Forest"],
    },
  });

  // Reviews
  await prisma.review.create({
    data: { brandId: kente.id, userId: alice.id, rating: 5, comment: "Stunning craftsmanship." },
  });
  await prisma.review.create({
    data: { brandId: kente.id, userId: bob.id, rating: 4, comment: "Beautiful fabric and fit." },
  });

  console.log("Seed complete");
}

run().finally(() => prisma.$disconnect());
