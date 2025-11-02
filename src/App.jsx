import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid, { products } from './components/ProductGrid';
import Footer from './components/Footer';

function Review({ author, text }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <p className="text-neutral-700">“{text}”</p>
      <p className="mt-3 text-sm font-semibold text-neutral-900">{author}</p>
    </div>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [customizing, setCustomizing] = useState(null); // product or null
  const [form, setForm] = useState({ quantity: 1, text: '', color: '', size: '', finish: '' });
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const openCustomize = (product) => {
    setCustomizing(product);
    const defaults = product.defaultOptions || {};
    setForm({ quantity: 1, text: '', color: defaults.color || '', size: defaults.size || '', finish: defaults.finish || '' });
  };

  const addToCart = (product, options, quantity) => {
    setCart((prev) => {
      const key = JSON.stringify({ id: product.id, options });
      const idx = prev.findIndex((i) => i.key === key);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
        return copy;
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.title,
          image: product.image,
          price: product.price,
          quantity,
          options,
        },
      ];
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      const items = cart.map((item) => ({
        id: item.id,
        name: item.name,
        unit_amount: Math.round(item.price * 100),
        quantity: item.quantity,
        image: item.image,
        metadata: item.options,
      }));

      const res = await fetch(`${backendUrl}/checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, currency: 'usd' }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Checkout failed');
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      alert(e.message || 'Unable to start checkout.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <ProductGrid
        onCustomize={(p) => openCustomize(p)}
        onAdd={(p, options, quantity) => addToCart(p, options, quantity)}
      />

      <section id="reviews" className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Loved by creators and teams</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Review author="Ava R." text="Quality is top‑notch and colors pop. Our event tees turned out perfect!" />
          <Review author="Daniel K." text="Uploaded my artwork and got beautiful framed prints within a week." />
          <Review author="Studio Nova" text="Mugs were a hit in our welcome kits. Smooth ordering and fast shipping." />
        </div>
      </section>

      <Footer />

      {customizing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 md:items-center">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">Customize {customizing.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">Add your details and choose options.</p>
              </div>
              <button onClick={() => setCustomizing(null)} className="rounded-full p-2 text-sm hover:bg-neutral-100">✕</button>
            </div>

            <div className="mt-4 grid gap-4">
              <div>
                <label className="text-sm font-medium">Custom text</label>
                <input value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} placeholder="Name, slogan, etc." className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-400" />
              </div>

              {('color' in (customizing.defaultOptions || {})) && (
                <div>
                  <label className="text-sm font-medium">Color</label>
                  <select value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-400">
                    {['White','Black','Red','Blue'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}

              {('size' in (customizing.defaultOptions || {})) && (
                <div>
                  <label className="text-sm font-medium">Size</label>
                  <select value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-400">
                    {['S','M','L','XL'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              {('finish' in (customizing.defaultOptions || {})) && (
                <div>
                  <label className="text-sm font-medium">Finish</label>
                  <select value={form.finish} onChange={(e) => setForm((f) => ({ ...f, finish: e.target.value }))} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-400">
                    {['Matte','Glossy'].map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Quantity</label>
                <input type="number" min={1} value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: Math.max(1, parseInt(e.target.value || '1', 10)) }))} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-400" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setCustomizing(null)} className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50">Cancel</button>
              <button onClick={() => { addToCart(customizing, { text: form.text, color: form.color, size: form.size, finish: form.finish }, form.quantity); setCustomizing(null); setCartOpen(true); }} className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800">Add to cart</button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="flex h-full w-full max-w-md flex-col bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 p-4">
              <h3 className="text-lg font-bold">Your cart</h3>
              <button onClick={() => setCartOpen(false)} className="rounded-full p-2 text-sm hover:bg-neutral-100">✕</button>
            </div>
            <div className="flex-1 space-y-3 overflow-auto p-4">
              {cart.length === 0 && <p className="text-sm text-neutral-600">Your cart is empty.</p>}
              {cart.map((item) => (
                <div key={item.key} className="flex gap-3 rounded-xl border border-neutral-200 p-3">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="mt-0.5 text-xs text-neutral-600">{Object.entries(item.options).filter(([,v]) => v).map(([k,v]) => `${k}: ${v}`).join(' · ')}</p>
                      </div>
                      <button onClick={() => setCart((prev) => prev.filter((i) => i.key !== item.key))} className="text-xs text-neutral-500 hover:text-neutral-800">Remove</button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-2 py-1 text-xs">
                        <button onClick={() => setCart((prev) => prev.map((i) => i.key === item.key ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))} className="px-2">−</button>
                        <span className="min-w-[2ch] text-center">{item.quantity}</span>
                        <button onClick={() => setCart((prev) => prev.map((i) => i.key === item.key ? { ...i, quantity: i.quantity + 1 } : i))} className="px-2">＋</button>
                      </div>
                      <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 p-4">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} disabled={cart.length === 0} className="mt-3 w-full rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50">
                Checkout with Stripe
              </button>
              <p className="mt-2 text-center text-xs text-neutral-500">Secure payments powered by Stripe</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
