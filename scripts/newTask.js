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
