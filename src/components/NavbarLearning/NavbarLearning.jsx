import { useState, useRef, useEffect } from "react";
import "./NavbarLearning.css";

function NavbarLearning({
  title,
  sections,
  currentSlide,
  setCurrentSlide,
  maxVisitedSlide,
  onBackToPrevChapter,
}) {
  const [open, setOpen] = useState(false);

  const activeRef = useRef(null);
  const navbarRef = useRef(null);

  // פתיחה / סגירה של הנאבבר
  const toggleNavbar = () => {
    setOpen((prev) => !prev);
  };

  // סגירה אוטומטית כשעוברים סלייד
  useEffect(() => {
    setOpen(false);
  }, [currentSlide]);

  // סגירה בלחיצה מחוץ לנאבבר
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // מעבר לסלייד
  const handleJump = (slideIndex) => {
    if (slideIndex > maxVisitedSlide) return;

    setCurrentSlide(slideIndex);

    // סוגר אחרי מעבר
    setOpen(false);
  };

  // גלילה אוטומטית לסלייד הפעיל
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  return (
    <div className="learning-navbar" ref={navbarRef}>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        {title}
      </div>

      <div className={`navbar-dropdown ${open ? "open" : ""}`}>
        {/* חזרה לפרק קודם */}
        {onBackToPrevChapter && (
          <div
            className="plate special-back-plate"
            onClick={onBackToPrevChapter}
          >
            <div className="plate-title">חזרה לפרק הקודם</div>

            <div className="plate-il">IL</div>
          </div>
        )}

        {/* רשימת הסקשנים */}
        {sections.map((section, index) => {
          const locked = section.slideIndex > maxVisitedSlide;

          const isActive = currentSlide === section.slideIndex;

          return (
            <div
              key={index}
              ref={isActive ? activeRef : null}
              className={`
                plate
                ${locked ? "locked" : ""}
                ${isActive ? "active" : ""}
              `}
              onClick={() => handleJump(section.slideIndex)}
            >
              <div className="plate-title">{section.title}</div>

              <div className="plate-il">IL</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NavbarLearning;
