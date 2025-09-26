/**
 * newTask.js
 * Handles the "create new task" modal behavior and creation flow.
 * Uses storage.allocateNextTaskId() to get new IDs safely.
 */

import {
  newTaskBtn,
  modalNewTask,
  newTaskCloseBtn,
  newTaskTitleInput,
  newTaskDescriptionInput,
  newTaskStatusSelect,
  newTaskPrioritySelect,
  newTaskForm,
} from "./elements.js";

import {
  tasks,
  saveTasks,
  normalizePriority,
  allocateNextTaskId,
} from "./storage.js";
import { sortAndPersist } from "./sorting.js";
import { renderTasks } from "./render.js";
import { updateDropdownHighlight } from "./dropdown.js";

/**
 * Creates a new task from modal input fields, validates, saves, and renders it.
 */
export function createTaskFromModal() {
  const newTask = {
    id: allocateNextTaskId(),
    title: (newTaskTitleInput.value || "").trim(),
    description: (newTaskDescriptionInput.value || "").trim(),
    status: newTaskStatusSelect ? newTaskStatusSelect.value : "todo",
    priority: normalizePriority(
      newTaskPrioritySelect ? newTaskPrioritySelect.value : "low"
    ),
  };

  // push to in-memory tasks array (exported array mutated in storage)
  tasks.push(newTask);

  // persist sorted order and render
  sortAndPersist();
  renderTasks(tasks);

  // Reset form fields
  if (newTaskForm) newTaskForm.reset();
  if (newTaskStatusSelect) newTaskStatusSelect.value = "todo";
  if (newTaskPrioritySelect) newTaskPrioritySelect.value = "low";

  // close modal
  if (modalNewTask) modalNewTask.style.display = "none";
  document.body.style.overflow = "";
}

/**
 * Wire up new task modal buttons + form submit.
 */
export function initNewTaskHandlers() {
  if (newTaskBtn) {
    newTaskBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        if (modalNewTask) modalNewTask.style.display = "flex";
        document.body.style.overflow = "hidden"; // Disable background scroll
        if (newTaskStatusSelect) newTaskStatusSelect.value = "todo";
        if (newTaskPrioritySelect) newTaskPrioritySelect.value = "low";
        if (newTaskStatusSelect) updateDropdownHighlight(newTaskStatusSelect);
        if (newTaskPrioritySelect)
          updateDropdownHighlight(newTaskPrioritySelect);
      })
    );
  }

  if (newTaskForm) {
    newTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (newTaskForm.checkValidity()) {
        createTaskFromModal();
      } else {
        newTaskForm.reportValidity();
      }
    });
  }

  if (newTaskCloseBtn) {
    newTaskCloseBtn.addEventListener("click", () => {
      if (modalNewTask) modalNewTask.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  if (newTaskStatusSelect)
    newTaskStatusSelect.addEventListener("change", () =>
      updateDropdownHighlight(newTaskStatusSelect)
    );
  if (newTaskPrioritySelect)
    newTaskPrioritySelect.addEventListener("change", () =>
      updateDropdownHighlight(newTaskPrioritySelect)
    );
}
