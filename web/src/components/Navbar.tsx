import { useRef, useEffect, useState } from "react";

export default function Navbar({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const isActive = (tab: string) => activeTab === tab;
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Calculate the position of the active tab for the slider
  const getActiveTabIndex = () => tabs.findIndex((tab) => isActive(tab));
  const activeIndex = getActiveTabIndex();

  useEffect(() => {
    // Measure all tab widths
    const widths = tabRefs.current.map((ref) => ref?.offsetWidth || 0);
    setTabWidths(widths);
  }, [tabs]);

  useEffect(() => {
    if (tabWidths.length > 0 && activeIndex >= 0) {
      // Calculate the left position by summing up widths of previous tabs
      const leftPosition = tabWidths
        .slice(0, activeIndex)
        .reduce((sum, width) => sum + width, 0);

      setSliderPosition(leftPosition);
      setSliderWidth(tabWidths[activeIndex] || 0);
    }
  }, [tabWidths, activeIndex]);

  return (
    <header className="flex flex-col items-center gap-2 mt-10 bg-white rounded-4xl p-4">
      <img src="/nasa-logo.png" alt="NASA Logo" className=" w-30 h-30" />
      <h1 className=" text-4xl font-bold text-sky-400">NASA Explorer</h1>

      <nav className="flex flex-wrap mt-4 overflow-hidden relative p-2">
        {/* Animated slider background */}
        <div
          className="absolute top-2 bottom-2 bg-sky-600 rounded-4xl transition-all duration-300 ease-in-out"
          style={{
            left: `${8 + sliderPosition}px`,
            width: `${sliderWidth}px`,
          }}
        />

        {tabs.map((tab, index) => (
          <div
            key={`${tab}-${index}`}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className="py-3 px-8 cursor-pointer rounded-4xl relative z-10"
          >
            <p
              className={`text-center transition-colors duration-300 font-bold tracking-wide ${
                isActive(tab) ? "text-white" : "text-sky-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </p>
          </div>
        ))}
      </nav>
    </header>
  );
}
