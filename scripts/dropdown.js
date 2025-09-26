/**
 * Dropdown highlight module
 * Adds faded effect and highlights selected option.
 */

/**
 * Updates faded effect for all dropdown options and highlights selected option.
 * @param {HTMLSelectElement} selectElement - The select element to update.
 */
export function updateDropdownHighlight(selectElement) {
  for (let option of selectElement.options) {
    option.classList.add("faded");
  }
  if (selectElement.selectedIndex >= 0) {
    selectElement.options[selectElement.selectedIndex].classList.remove(
      "faded"
    );
  }
}
