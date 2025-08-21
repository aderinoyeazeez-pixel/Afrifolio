import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afrifolio",
  description: "The global stage for African fashion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-neutral-800">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="font-semibold tracking-tight">Afrifolio</Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/brands">Brands</Link>
              <Link href="/creator/apply">Creator apply</Link>
              <Link href="/cart">Cart</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t border-neutral-800 mt-16">
          <div className="container py-6 text-sm text-neutral-400">
            © {new Date().getFullYear()} Afrifolio
          </div>
        </footer>
      </body>
    </html>
  );
}
