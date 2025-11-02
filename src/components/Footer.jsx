export default function Footer() {
  return (
    <footer id="contact" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold">CustomCraft Studio</h3>
            <p className="mt-2 max-w-md text-sm text-neutral-600">
              Professional custom printing for cups, T‑shirts, and photo prints. Built for creators, teams, and thoughtful gifts.
            </p>
            <p className="mt-4 text-xs text-neutral-500">© {new Date().getFullYear()} CustomCraft Studio. All rights reserved.</p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h4 className="text-base font-semibold">Stay in the loop</h4>
            <p className="mt-1 text-sm text-neutral-600">Get product updates, deals, and design tips.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks for subscribing!');
              }}
              className="mt-4 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full flex-1 rounded-full border border-neutral-300 px-4 py-3 text-sm outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-400"
              />
              <button className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
