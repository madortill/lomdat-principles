import { useEffect, useState } from "react";
import "./Tabs.css";

function Tabs({ data, unlock, wasCompleted }) {
  const [activeTab, setActiveTab] = useState(0);

  // 2. איתחול הטאבים שביקרנו בהם
  const [visitedTabs, setVisitedTabs] = useState(
    // אם הושלם - מלא את כל האינדקסים, אם לא - התחל עם הטאב הראשון (0)
    wasCompleted ? data.tabs.map((_, i) => i) : [0]
  );

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
      // אנחנו לא רוצים לקרוא ל-unlock שוב אם זה כבר היה מושלם
      if (!wasCompleted) {
        unlock?.();
      }
    }
  }, [visitedTabs, tabs.length, wasCompleted]);

  return (
    <div className="tabs-slide">
      <div className="learning-content-2">
        <h2 className="slide-title2">{data.header}</h2>
        <div className="slide-text2">{data.text1}</div>
        <div className="slide-text2">{data.text2}</div>
        <div className="slide-text2 special-text">{data.info}</div>

        <div className="tabs">
          <div className="tabs-container">
            {tabs.map((tab, i) => (
              <div
                key={i}
                className={`tab ${i === activeTab ? "active" : ""}`}
                onClick={() => handleTabClick(i)}
              >
                {tab.tab}
                {/* אופציונלי: להוסיף כאן V קטן אם את רוצה סימון ויזואלי על הטאב עצמו */}
              </div>
            ))}
          </div>

          <div className="tab-content">
            <img src={tabs[activeTab]?.img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
