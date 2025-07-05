import { useState } from "react";
import Navbar from "./components/Navbar";
import Apod from "./pages/Apod";

const TABS = [
  "APOD",
  "Mars Rovers",
  "NEO Tracker",
  "Earth Images",
  "Media Search",
];

export default function App() {
  const [activeTab, setActiveTab] = useState("APOD");

  return (
    <div className="min-h-screen ">
      <Navbar tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-4 md:p-8">
        {activeTab === "APOD" && <Apod />}
        {/* {activeTab === "Mars Rovers" && <MarsPhotos />}
        {activeTab === "NEO Tracker" && <Neo />}
        {activeTab === "Earth Images" && <Epic />}
        {activeTab === "Media Search" && <MediaLibrary />} */}
      </main>
    </div>
  );
}
