/**
 * Sorting helpers module
 * Sorting helpers: status order, priorityRank, sortTasksArray, sortAndPersist.
 */

import { tasks, saveTasks, normalizePriority } from "./storage.js";

/** Priority rank mapping */
export const priorityRank = { high: 3, medium: 2, low: 1 };

/** Status rank mapping */
const statusOrder = { todo: 0, doing: 1, done: 2 };

/**
 * Sorts tasks array by status, then priority (high->low), then id.
 * @param {Task[]} arr - Array of tasks to sort.
 * @returns {Task[]} Sorted array.
 */
export function sortTasksArray(arr) {
  return arr.slice().sort((a, b) => {
    const sa = statusOrder[a.status] ?? 0;
    const sb = statusOrder[b.status] ?? 0;
    if (sa !== sb) return sa - sb;

    // priority high -> medium -> low
    const pa = priorityRank[normalizePriority(a.priority)];
    const pb = priorityRank[normalizePriority(b.priority)];
    if (pa !== pb) return pb - pa; // descending (high first)

    // fallback stable by id
    return a.id - b.id;
  });
}
