/**
 * UI feedback module
 * Handles loading and error messages in the UI.
 */

/**
 * Create and insert a loading message at the top of the columns.
 */
export function showLoading() {
  const loadingDiv = document.createElement("p");
  loadingDiv.textContent = "Loading tasks...";
  loadingDiv.id = "loading-message";
  loadingDiv.classList.add("loading-div");
  const columnsDiv = document.querySelector(".columns");
  columnsDiv.prepend(loadingDiv);
}

/**
 * Hide loading message if it exists.
 */
export function hideLoading() {
  const loadingDiv = document.getElementById("loading-message");
  if (loadingDiv) loadingDiv.remove();
}
