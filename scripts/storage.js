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

/**
 * Saves tasks array to localStorage and updates task counter.
 * @param {Task[]} updatedTasks - Array of tasks to save.
 */
export function saveTasks(updatedTasks) {
  try {
    // ensure it's an array
    const arr = Array.isArray(updatedTasks) ? updatedTasks : [];

    // mutate exported tasks array in-place
    tasks.splice(0, tasks.length, ...arr);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("nextTaskId", String(nextTaskId));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
}

/**
 * Loads tasks from localStorage. Falls back to empty array if not found.
 * Updates `nextTaskId` counter if stored in localStorage.
 * @returns {Task[]} Array of loaded tasks.
 */
export function loadTasks() {
  try {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      const parsed = JSON.parse(saved);

      // ensure priority exists for older schema tasks
      const normalized = (Array.isArray(parsed) ? parsed : []).map((t) => ({
        ...t,
        priority: normalizePriority(t.priority),
      }));

      // replace contents of exported tasks array
      tasks.splice(0, tasks.length, ...normalized);

      const savedNextId = localStorage.getItem("nextTaskId");
      if (savedNextId) {
        nextTaskId = parseInt(savedNextId, 10);
      } else {
        // compute nextTaskId from tasks
        nextTaskId =
          tasks.length > 0
            ? tasks.reduce((m, x) => Math.max(m, x.id), 0) + 1
            : 1;
      }
    } else {
      // initialize empty state
      tasks.splice(0, tasks.length); // clear
      nextTaskId = 1;

      // Save them immediately so they persist after refresh
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("nextTaskId", String(nextTaskId));
    }
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);

    // Fall back to empty tasks if something goes wrong
    tasks.splice(0, tasks.length);
    nextTaskId = 1;
  }
  return tasks;
}
