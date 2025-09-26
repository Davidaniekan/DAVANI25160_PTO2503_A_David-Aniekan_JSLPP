/**
 * Rendering module
 * Renders tasks into columns and updates counts.
 */

import { tasks } from "./storage.js";
import { normalizePriority } from "./storage.js";
import { priorityRank } from "./sorting.js";

/**
 * Render all tasks into their respective columns.
 * @param {import("./storage").Task[]=} tasksList -  Array of tasks to render.
 */
export function renderTasks(tasksList = null) {
  const list = Array.isArray(tasksList) ? tasksList : tasks;

  // Clear all task containers
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });

  const statuses = ["todo", "doing", "done"];
  statuses.forEach((status) => {
    const columnEl = document.querySelector(`#${status} .tasks-container`);
    if (!columnEl) return;

    // filter tasks for status and sort by priority (high->low)
    const items = list
      .filter((t) => (t.status || "todo") === status)
      .slice()
      .sort((a, b) => {
        const pa = priorityRank[normalizePriority(a.priority)];
        const pb = priorityRank[normalizePriority(b.priority)];
        if (pa !== pb) return pb - pa; // high first
        return a.id - b.id;
      });

    items.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("taskCard");
      taskElement.dataset.id = String(task.id);

      // title span (left)
      const titleSpan = document.createElement("span");
      titleSpan.classList.add("task-title");
      titleSpan.textContent = task.title;

      // priority dot (right)
      const dot = document.createElement("span");
      dot.className = `priority-dot ${normalizePriority(task.priority)}`;
      dot.setAttribute(
        "data-tooltip",
        normalizePriority(task.priority).charAt(0).toUpperCase() +
          normalizePriority(task.priority).slice(1)
      );

      // append children (title first, dot last so dot sits to the right)
      taskElement.appendChild(titleSpan);
      taskElement.appendChild(dot);

      // dispatch an event instead of calling modal directly (avoids circular import)
      taskElement.addEventListener("click", () => {
        const ev = new CustomEvent("open-task", { detail: { id: task.id } });
        document.dispatchEvent(ev);
      });

      columnEl.appendChild(taskElement);
    });
  });

  updateColumnCounts(list);
}

