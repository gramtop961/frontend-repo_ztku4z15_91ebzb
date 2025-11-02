import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

function Review({ author, text }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <p className="text-neutral-700">“{text}”</p>
      <p className="mt-3 text-sm font-semibold text-neutral-900">{author}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <Hero />
      <ProductGrid />

      <section id="reviews" className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Loved by creators and teams</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Review author="Ava R." text="Quality is top‑notch and colors pop. Our event tees turned out perfect!" />
          <Review author="Daniel K." text="Uploaded my artwork and got beautiful framed prints within a week." />
          <Review author="Studio Nova" text="Mugs were a hit in our welcome kits. Smooth ordering and fast shipping." />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
