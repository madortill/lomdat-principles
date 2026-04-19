import { useEffect, useState } from "react";
import "./Tabs.css";

function Tabs({ data, unlock }) {
  const [activeTab, setActiveTab] = useState(0);
  const [visitedTabs, setVisitedTabs] = useState([]);

  const tabs = data?.tabs ?? [];

  function handleTabClick(index) {
    setActiveTab(index);

    if (!visitedTabs.includes(index)) {
      setVisitedTabs((prev) => [...prev, index]);
    }
  }

  // 🔓 unlock אחרי מעבר על כולם
  useEffect(() => {
    if (visitedTabs.length === tabs.length && tabs.length > 0) {
      unlock?.();
    }
  }, [visitedTabs, tabs.length]);

  return (
    <div className="tabs-slide">
      <div className="learning-content-2">
        <h2 className="slide-title2">{data.header}</h2>
        <div className="slide-text2">{data.text1}</div>
        <div className="slide-text2">{data.text2}</div>
        <div className="slide-text2 special-text">{data.info}</div>

      {/* טאבים */}
      <div className="tabs">
      <div className="tabs-container">
        {tabs.map((tab, i) => (
            <div
            key={i}
            className={`tab ${i === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(i)}
          >
            {tab.tab}
          </div>
        ))}
      </div>

      {/* תוכן */}
      <div className="tab-content">
        <img src={tabs[activeTab]?.img} alt="" />
      </div>
    </div>
    </div>
        </div>
  );
}

export default Tabs;