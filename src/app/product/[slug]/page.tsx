'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  sizes: string[];
  colours: string[];
  brand: { name: string; slug: string };
};

async function fetchProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`/api/product/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

function addToCart(item: { slug: string; name: string; price: number; qty: number }) {
  const key = "afrifolio_cart";
  const raw = localStorage.getItem(key);
  const cart = raw ? JSON.parse(raw) : [];
  const idx = cart.findIndex((x: any) => x.slug === item.slug);
  if (idx >= 0) {
    cart[idx].qty += item.qty;
  } else {
    cart.push(item);
  }
  localStorage.setItem(key, JSON.stringify(cart));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProduct(params.slug).then(setProduct);
  }, [params.slug]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="text-sm text-neutral-400">
        <Link href={"/brand/" + product.brand.slug}>{product.brand.name}</Link>
      </div>
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <div className="text-neutral-300">{product.description}</div>
      <div className="text-neutral-200">NGN {(product.price/100).toLocaleString()}</div>
      <button
        onClick={() => addToCart({ slug: product.slug, name: product.name, price: product.price, qty: 1 })}
        className="px-4 py-2 rounded-xl bg-white text-black"
      >
        Add to cart
      </button>
    </div>
  );
}
