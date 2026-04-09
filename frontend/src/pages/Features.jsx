import Sidebar from "../components/Sidebar";

export default function Features() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Select a Feature</h1>
      </div>
    </div>
  );
}