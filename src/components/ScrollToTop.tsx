import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';

export default function ScrollToTop() {
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);
    
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    
    return (
        <button id="scroll-to-top" onFocus={() => setShowButton(true)} onBlur={() => setShowButton(false)}  onClick={goToTop} aria-label="Scroll to top" className={`${showButton ? "block" : "sr-only"} fixed bottom-5 right-5 rounded bg-background-less hover:cursor-pointer z-2 transition-opacity transition-discrete duration-250`}>
            <FontAwesomeIcon icon={faAnglesUp} className="py-[6px]" size="3x" />
        </button>
    );
};