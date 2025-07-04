export default function Navbar({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <header className="bg-gray-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center ">
        <div className="flex items-center gap-2 flex-nowrap">
          <img src="/nasa-logo.png" alt="NASA Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-sky-400">NASA Explorer</h1>
        </div>

        <nav className="flex gap-3 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md transition ${
                activeTab === tab
                  ? "bg-sky-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex-1" />
      </div>
    </header>
  );
}
