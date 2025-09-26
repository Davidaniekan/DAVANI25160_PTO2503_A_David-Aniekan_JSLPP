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

  // Desktop toggle handler
  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      document.body.classList.add("dark-theme");
      themeSwitchMobile.checked = true;
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      themeSwitchMobile.checked = false;
      localStorage.setItem("theme", "light");
    }
  });

}
