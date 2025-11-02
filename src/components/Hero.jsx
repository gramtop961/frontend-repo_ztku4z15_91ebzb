import { Star, Shirt, Camera, Coffee } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-indigo-50">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 lg:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
              <Star className="h-3.5 w-3.5 text-yellow-300" />
              4.9/5 from 3k+ happy creators
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
              Design your own cups, tees, and photo prints
            </h1>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              Bring your ideas to life with premium materials, vibrant colors, and fast delivery. Perfect for gifts, events, and personal brands.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#shop" className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800">
                Start designing
              </a>
              <a href="#how" className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50">
                See how it works
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-3">
                <Shirt className="h-4 w-4" />
                Premium tees
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-3">
                <Coffee className="h-4 w-4" />
                Ceramic cups
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-3">
                <Camera className="h-4 w-4" />
                Photo prints
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop"
                alt="Custom product showcase"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
