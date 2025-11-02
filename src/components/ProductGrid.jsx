import { Shirt, Camera, Coffee, Star } from 'lucide-react';

const products = [
  {
    id: 'tee-classic',
    title: 'Custom T‑Shirt',
    price: 24.0,
    rating: 4.9,
    icon: Shirt,
    image:
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
    tag: 'Best Seller',
    defaultOptions: { color: 'White', size: 'M' },
  },
  {
    id: 'mug-ceramic',
    title: 'Premium Ceramic Cup',
    price: 18.0,
    rating: 4.8,
    icon: Coffee,
    image:
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop',
    tag: 'Hot',
    defaultOptions: { color: 'White' },
  },
  {
    id: 'photo-print',
    title: 'Gallery Photo Print',
    price: 14.0,
    rating: 4.7,
    icon: Camera,
    image:
      'https://images.unsplash.com/photo-1501707305551-9b2adda5e527?q=80&w=1200&auto=format&fit=crop',
    tag: 'New',
    defaultOptions: { finish: 'Matte', size: '8x10' },
  },
  {
    id: 'tee-premium',
    title: 'Premium T‑Shirt',
    price: 29.0,
    rating: 5.0,
    icon: Shirt,
    image:
      'https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=1200&auto=format&fit=crop',
    tag: 'Limited',
    defaultOptions: { color: 'Black', size: 'L' },
  },
  {
    id: 'mug-color',
    title: 'Color Inside Cup',
    price: 20.0,
    rating: 4.6,
    icon: Coffee,
    image:
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1200&auto=format&fit=crop',
    tag: 'Staff pick',
    defaultOptions: { color: 'Red' },
  },
  {
    id: 'photo-framed',
    title: 'Framed Photo Print',
    price: 39.0,
    rating: 4.9,
    icon: Camera,
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
    tag: 'Premium',
    defaultOptions: { finish: 'Glossy', size: '11x14' },
  },
];

function ProductCard({ product, onCustomize, onAdd }) {
  const Icon = product.icon;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        <img src={product.image} alt={product.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
          {product.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-neutral-700" />
            <h3 className="text-base font-semibold text-neutral-900">{product.title}</h3>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
            <Star className="h-3.5 w-3.5 text-yellow-500" /> {product.rating}
          </div>
        </div>
        <p className="text-sm text-neutral-600">High‑quality print with long‑lasting colors. Free design alignment check.</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">${product.price.toFixed(2)}</span>
          <div className="flex gap-2">
            <button onClick={() => onCustomize(product)} className="rounded-full border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50">Customize</button>
            <button onClick={() => onAdd(product, { ...product.defaultOptions, text: '' }, 1)} className="rounded-full bg-neutral-900 px-3 py-2 text-xs font-semibold text-white hover:bg-neutral-800">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ onCustomize, onAdd }) {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">Shop our best sellers</h2>
          <p className="mt-2 text-neutral-600">Personalize any item with your logo, text, or artwork.</p>
        </div>
        <a href="#how" className="hidden rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 md:inline-flex">How it works</a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onCustomize={onCustomize} onAdd={onAdd} />
        ))}
      </div>

      <div id="how" className="mt-16 grid gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Step 1</p>
          <h3 className="mt-1 text-lg font-bold">Choose a product</h3>
          <p className="mt-1 text-sm text-neutral-600">Pick from tees, cups, and photo prints in multiple finishes.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-indigo-600">Step 2</p>
          <h3 className="mt-1 text-lg font-bold">Upload your design</h3>
          <p className="mt-1 text-sm text-neutral-600">We automatically optimize, then our team double‑checks alignment.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-indigo-600">Step 3</p>
          <h3 className="mt-1 text-lg font-bold">We print and ship</h3>
          <p className="mt-1 text-sm text-neutral-600">Fast, tracked delivery. Satisfaction guaranteed.</p>
        </div>
      </div>
    </section>
  );
}

export { products };
