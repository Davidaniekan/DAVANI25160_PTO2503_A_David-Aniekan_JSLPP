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

/**
 * Show an error message at the top of the columns.
 * @param {string} message - Error message to display.
 */
export function showError(message) {
  const existingError = document.getElementById("error-message");
  if (existingError) existingError.remove();

  const errorDiv = document.createElement("p");
  errorDiv.textContent = message;
  errorDiv.id = "error-message";
  errorDiv.classList.add("error-div");
  const columnsDiv = document.querySelector(".columns");
  columnsDiv.prepend(errorDiv);
}
