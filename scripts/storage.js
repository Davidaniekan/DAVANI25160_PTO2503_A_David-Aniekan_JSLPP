/**
 * Storage module
 * Handles saving and loading tasks to/from localStorage.
 */

/**
 * @typedef {Object} Task
 * @property {number} id - Unique identifier for the task.
 * @property {string} title - Title of the task.
 * @property {string} description - Short description of the task.
 * @property {string} status - Status column: 'todo', 'doing', or 'done'.
 * @property {string} priority - Priority level: 'high', 'medium', or 'low'.
 */

// These will be shared across modules
export let tasks = [];
export let nextTaskId = 1;

/**
 * Normalizes priority values to 'low', 'medium', or 'high'.
 * @param {string} value - The priority value to normalize.
 * @returns {"low"|"medium"|"high"} Normalized priority string.
 */
export function normalizePriority(value) {
  if (!value) return "low";
  const v = String(value).toLowerCase();
  return v === "high" || v === "medium" || v === "low" ? v : "low";
}
