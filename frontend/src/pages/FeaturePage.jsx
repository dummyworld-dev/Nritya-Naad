import { useParams } from "react-router-dom";
import features from "../data/features.json";
import Sidebar from "../components/Sidebar";

export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">{feature?.name}</h1>
        <p className="mt-4">Implementation area for this feature</p>
      </div>
    </div>
  );
}