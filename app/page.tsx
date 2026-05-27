export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="max-w-2xl">
        <h1 className="font-serif text-5xl font-bold text-terracotta mb-4">
          Welcome to Hope's Craft
        </h1>
        <p className="font-sans text-lg text-forest-slate mb-8">
          Heritage Storytelling & Sustainable Jute Commerce.
        </p>
        <button className="btn btn-primary text-jute-base font-sans">
          Explore Our Story
        </button>
      </div>
    </main>
  );
}