/**
 * Theme module
 * Handles theme switching between dark and light modes. (sync desktop + mobile)
 */

import { themeSwitch, themeSwitchMobile } from "./elements.js";

// On load, apply saved theme and sync both toggles
export function initThemeToggle() {
  if (!themeSwitch || !themeSwitchMobile) return;

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeSwitch.checked = true;
    themeSwitchMobile.checked = true;
  }

}
