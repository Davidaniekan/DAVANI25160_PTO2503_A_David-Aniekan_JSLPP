import { sidebar, hideSidebarBtn, eyeBtn } from "./elements.js";

let _inited = false;

/**
 * Toggle sidebar visibility.
 * @param {boolean} show - If true, sidebar will be shown; if false, it will be hidden.
 */
export function toggleSidebar(show) {
  if (!sidebar) return;

  sidebar.style.display = show ? "flex" : "none";
  if (eyeBtn) eyeBtn.style.display = show ? "none" : "flex";

  localStorage.setItem("sidebarHidden", show ? "false" : "true");
}

/**
 * Initialize sidebar: attach listeners and restore state.
 */
export function initSidebar() {
  if (_inited) return;
  _inited = true;

  // Attach click listener to hide sidebar button
  hideSidebarBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    toggleSidebar(false);
  });

  // Attach click listener to eye button to show sidebar
  eyeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    toggleSidebar(true);
  });

  // Restore state or show sidebar by default
  const hidden = localStorage.getItem("sidebarHidden") === "true";
  toggleSidebar(!hidden); // sidebar shows by default if nothing stored
}
