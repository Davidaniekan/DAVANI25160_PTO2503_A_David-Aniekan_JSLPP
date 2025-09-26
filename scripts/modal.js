/**
 * modal.js
 * Modal behavior for existing task modal and delete confirmation plus edit/save handling.
 */

import {
  taskTitleInput,
  taskDescriptionInput,
  taskStatusSelect,
  taskPrioritySelect,
  modalBackdrop,
  closeModalBtn,
  editTaskForm,
  deleteBtn,
  confirmModal,
  confirmYes,
  confirmNo,
  modalNewTask,
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

let currentTaskId = null;

/**
 * Opens modal with provided task data pre-filled.
 * @param {import("./storage").Task} task - Task object to display in modal.
 */
export function openModal(task) {
  if (!task) return;

  currentTaskId = task.id; // store ID

  if (taskTitleInput) taskTitleInput.value = task.title || "";
  if (taskDescriptionInput) taskDescriptionInput.value = task.description || "";
  if (taskStatusSelect) taskStatusSelect.value = task.status || "todo";
  if (taskPrioritySelect)
    taskPrioritySelect.value = normalizePriority(task.priority);

  // apply select fading highlight
  if (taskStatusSelect) updateDropdownHighlight(taskStatusSelect);
  if (taskPrioritySelect) updateDropdownHighlight(taskPrioritySelect);

  // show modal
  if (modalBackdrop) {
    modalBackdrop.style.display = "flex";
    document.body.style.overflow = "hidden"; // Disable background scroll
  }
}

/**
 * Find task by id and open modal.
 * @param {number} id
 */
export function openModalById(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  openModal(task);
}
