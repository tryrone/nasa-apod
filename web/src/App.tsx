import { useState } from "react";
import Navbar from "@/components/Navbar";
import Apod from "@/pages/Apod";
import MarsPhotos from "@/pages/MarsPhotos";
import MediaLibrary from "@/pages/MediaLibrary";
import NeoVisualiserChart from "@/pages/NeoVisualizerChart";

const TABS = ["APOD", "Mars Rovers", "Near Earth Objects", "Media Search"];

export default function App() {
  const [activeTab, setActiveTab] = useState("APOD");

  return (
    <div className="min-h-screen ">
      <Navbar tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-4 bg-white rounded-4xl mt-6 mb-10">
        {activeTab === "APOD" && <Apod />}
        {activeTab === "Mars Rovers" && <MarsPhotos />}
        {activeTab === "Near Earth Objects" && <NeoVisualiserChart />}
        {activeTab === "Media Search" && <MediaLibrary />}
      </main>
    </div>
  );
}
