import { ShoppingCart, Menu } from 'lucide-react';

export default function Navbar({ cartCount = 0, onCartClick }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-rose-500" />
          <span className="text-lg font-semibold tracking-tight">CustomCraft Studio</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#shop" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">Shop</a>
          <a href="#how" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">How it works</a>
          <a href="#reviews" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">Reviews</a>
          <a href="#contact" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onCartClick} className="relative inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50">
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-neutral-900 px-1 text-xs font-semibold text-white">{cartCount}</span>
          </button>
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}
