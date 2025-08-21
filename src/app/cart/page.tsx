'use client';
import { useEffect, useState } from "react";

type Item = { slug: string; name: string; price: number; qty: number };

export default function CartPage() {
  const [items, setItems] = useState<Item[]>([]);
  const key = "afrifolio_cart";

  useEffect(() => {
    const raw = localStorage.getItem(key);
    setItems(raw ? JSON.parse(raw) : []);
  }, []);

  const total = items.reduce((s, x) => s + x.price * x.qty, 0);

  function remove(slug: string) {
    const next = items.filter(x => x.slug !== slug);
    setItems(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  function checkout() {
    alert("Demo checkout complete. This is a simulated order.");
    setItems([]);
    localStorage.removeItem(key);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div className="space-y-4">
          {items.map(it => (
            <div key={it.slug} className="card flex items-center justify-between">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-neutral-400">NGN {(it.price/100).toLocaleString()} × {it.qty}</div>
              </div>
              <button onClick={() => remove(it.slug)} className="text-sm text-red-400">Remove</button>
            </div>
          ))}
          <div className="text-right font-medium">Total NGN {(total/100).toLocaleString()}</div>
          <button onClick={checkout} className="px-4 py-2 rounded-xl bg-white text-black">Checkout demo</button>
        </div>
      )}
    </div>
  );
}
