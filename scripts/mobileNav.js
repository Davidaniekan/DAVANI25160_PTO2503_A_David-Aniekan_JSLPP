/**
 * Mobile navigation module
 * Handles mobile navigation modal open/close.
 */

import {
  logoLightIcon,
  logoDarkIcon,
  mobileNavBackdrop,
  mobileNavClose,
  mobileBoardBtn,
} from "./elements.js";

export function initMobileNav() {
  function openMobileNav() {
    if (!mobileNavBackdrop) return;
    mobileNavBackdrop.style.display = "flex";
    requestAnimationFrame(() => {
      mobileNavBackdrop.classList.add("show");
    });
    document.body.style.overflow = "hidden"; // Disable background scroll
    if (mobileBoardBtn) {
      mobileBoardBtn.addEventListener(
        "click",
        () => (mobileNavBackdrop.style.display = "none")
      );
    }
  }

  function closeMobileNav() {
    if (!mobileNavBackdrop) return;
    mobileNavBackdrop.classList.remove("show");
    document.body.style.overflow = ""; // Restore scroll

    // Wait for animation to finish before hiding backdrop
    setTimeout(() => {
      if (!mobileNavBackdrop.classList.contains("show")) {
        mobileNavBackdrop.style.display = "none";
      }
    }, 300);
  }

}
