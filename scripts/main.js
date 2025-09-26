/**
 * Main entry module
 * Application entry point. Wires modules together and bootstraps the board.
 *
 */
import {
  loadTasks,
  replaceTasks,
  setNextTaskId,
  tasks as storageTasks,
} from "./storage.js";
import { renderTasks } from "./render.js";
import { initModalHandlers, openModalById } from "./modal.js";
import { initNewTaskHandlers } from "./newTask.js";
import { initThemeToggle } from "./theme.js";
import { initMobileNav } from "./mobileNav.js";
import { initSidebar  } from "./sidebar.js";
import { showLoading, hideLoading, showError } from "./ui.js";
import { sortAndPersist } from "./sorting.js";
import { updateDropdownHighlight } from "./dropdown.js";
import {
  taskStatusSelect,
  taskPrioritySelect,
  newTaskStatusSelect,
  newTaskPrioritySelect,
} from "./elements.js";

/**
 * Initialize the Kanban board.
 */
export async function initTaskBoard() {
  showLoading();

  try {
    // load tasks from local storage first (mutates exported tasks array)
    const loaded = loadTasks();

    // render from local storage
    renderTasks(loaded);

    // initialize handlers
    initModalHandlers();
    initNewTaskHandlers();

    // wire dropdown fading for selects
    if (taskStatusSelect)
      taskStatusSelect.addEventListener("change", () =>
        updateDropdownHighlight(taskStatusSelect)
      );

    if (taskPrioritySelect)
      taskPrioritySelect.addEventListener("change", () =>
        updateDropdownHighlight(taskPrioritySelect)
      );

    if (newTaskStatusSelect)
      newTaskStatusSelect.addEventListener("change", () =>
        updateDropdownHighlight(newTaskStatusSelect)
      );

    if (newTaskPrioritySelect)
      newTaskPrioritySelect.addEventListener("change", () =>
        updateDropdownHighlight(newTaskPrioritySelect)
      );

    // Try fetching fresh tasks in background
    try {
      const response = await fetch("https://jsl-kanban-api.vercel.app/");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      // Only update if localStorage is empty (first load)
      const saved = localStorage.getItem("tasks");
      if (!saved || JSON.parse(saved).length === 0) {
        // Map data to ensure priority property exists
        const mapped = (Array.isArray(data) ? data : []).map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          status: t.status ?? "todo",
          priority: t.priority ? String(t.priority) : "low",
        }));

        // Use storage.replaceTasks and setNextTaskId (safe API)
        replaceTasks(mapped);
        setNextTaskId(mapped.reduce((max, t) => Math.max(max, t.id), 0) + 1);

        // persist sorted and render
        sortAndPersist();
        renderTasks(storageTasks);
      }
    } catch (err) {
      console.error("Fetching tasks failed:", err);
      showError(
        "⚠️ Failed to fetch latest tasks. Displaying saved tasks instead."
      );
    }
  } catch (error) {
    console.error("initTaskBoard error:", error);
    showError("⚠️ Failed to initialize board.");
  } finally {
    hideLoading();
  }
}

/**
 * Wire document-level event listener for opening modals from rendered task cards.
 * render.js dispatches 'open-task' events; here we call openModalById.
 */
document.addEventListener("open-task", (e) => {
  const id = e.detail && e.detail.id;
  if (typeof id === "number") {
    openModalById(id);
  }
});

// init theme, mobile nav and boot board
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initSidebar();

  // initialize the board
  initTaskBoard();
});
