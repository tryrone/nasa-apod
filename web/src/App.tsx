import { useState } from "react";
import Navbar from "@/components/Navbar";
import Apod from "@/pages/Apod";
import MarsPhotos from "@/pages/MarsPhotos";
import Epic from "@/pages/Epic";
import MediaLibrary from "@/pages/MediaLibrary";

const TABS = ["APOD", "Mars Rovers", "Earth Images", "Media Search"];

export default function App() {
  const [activeTab, setActiveTab] = useState("APOD");

  return (
    <div className="min-h-screen ">
      <Navbar tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-4 bg-white rounded-4xl mt-6">
        {activeTab === "APOD" && <Apod />}
        {activeTab === "Mars Rovers" && <MarsPhotos />}
        {activeTab === "Earth Images" && <Epic />}
        {activeTab === "Media Search" && <MediaLibrary />}
      </main>
    </div>
  );
}
