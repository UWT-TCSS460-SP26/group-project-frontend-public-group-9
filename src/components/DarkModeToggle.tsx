import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

export default function DarkModeToggle() {
    function setIsDark(isDark: boolean) {
        console.log("Setting dark to", isDark);
        console.log(document.getElementsByTagName('body')[0])
        document.getElementsByTagName('body')[0].classList.toggle('light')
        console.log(document.getElementsByTagName('body')[0])
    }

    return (
        <div>
            <button aria-label="Toggle dark mode off" className="block dark:hidden px-3 py-3 text-lg font-medium hover:cursor-pointer hover:text-foreground-less hover:bg-background-less" onClick={() => setIsDark(false)}>
                <FontAwesomeIcon icon={faSun} />
            </button>
            <button aria-label="Toggle dark mode on" className="hidden dark:block px-3 py-3 text-lg font-medium hover:cursor-pointer hover:text-foreground-less hover:bg-background-less" onClick={() => setIsDark(true)}>
                <FontAwesomeIcon icon={faMoon} />
            </button>
        </div>
    );
};