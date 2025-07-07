import { useState } from "react";
import Navbar from "@/components/Navbar";
import Apod from "@/pages/Apod";
import MarsPhotos from "@/pages/MarsPhotos";
import MediaLibrary from "@/pages/MediaLibrary";
import NeoVisualiserChart from "@/pages/NeoVisualizerChart";

const TABS = ["APOD", "Mars Rovers", "Near Earth Objects", "Media Search"];

export default function App() {
  const [activeTab, setActiveTab] = useState("APOD");

  const hazardData = [
    { name: "Hazardous", value: 4 },
    { name: "Non-Hazardous", value: 11 },
  ];

  const barData = [
    { date: "2025-07-01", count: 3 },
    { date: "2025-07-02", count: 5 },
    { date: "2025-07-03", count: 2 },
    { date: "2025-07-04", count: 1 },
    { date: "2025-07-05", count: 4 },
  ];

  return (
    <div className="min-h-screen ">
      <Navbar tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-4 bg-white rounded-4xl mt-6 mb-10">
        {activeTab === "APOD" && <Apod />}
        {activeTab === "Mars Rovers" && <MarsPhotos />}
        {activeTab === "Near Earth Objects" && (
          <NeoVisualiserChart barData={barData} hazardData={hazardData} />
        )}
        {activeTab === "Media Search" && <MediaLibrary />}
      </main>
    </div>
  );
}
