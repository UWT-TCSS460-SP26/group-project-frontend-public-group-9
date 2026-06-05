import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);

  const systemPrefersDark = useMediaQuery({
        query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setIsDark(isSystemDark)
  );

  return (
    <div className="px-3 py-3 text-lg font-medium hover:text-foreground-less hover:bg-background-less">
        <button className="block dark:hidden" onClick={() => console.log("guh")}>
            <FontAwesomeIcon icon={faSun} />
        </button>
        <button className="hidden dark:block" onClick={() => console.log("weh")}>
            <FontAwesomeIcon icon={faMoon} />
        </button>
    </div>
    // <Toggle
    //   checked={isDark}
    //   onChange={({ target }) => setIsDark(target.checked)}
    //   icons={{ checked: "🌙", unchecked: "🔆" }}
    //   aria-label="Dark mode toggle"
    // />
  );
};