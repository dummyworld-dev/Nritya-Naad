import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">NrityaNaad</h1>
      <p className="mb-6 text-lg">Explore Indian Dance & Music Culture</p>
      <Link to="/features" className="px-6 py-3 bg-orange-400 rounded">
        Explore Features
      </Link>
    </div>
  );
}
