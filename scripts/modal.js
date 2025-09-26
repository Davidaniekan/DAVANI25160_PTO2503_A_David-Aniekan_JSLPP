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

/**
 * Close the modal and reset currentTaskId
 */
export function closeModal() {
  [modalBackdrop, modalNewTask].forEach((el) => {
    if (el) el.style.display = "none";
  });
  document.body.style.overflow = ""; // Restore scroll
  currentTaskId = null;
}

/**
 * Create a new task programmatically .
 * @param {string} title
 * @param {string} description
 * @param {string} status
 * @param {string} priority
 */
export function createTask(title, description, status, priority) {
  const newTask = {
    id: allocateNextTaskId(),
    title: (title || "").trim(),
    description: (description || "").trim(),
    status: status || "todo",
    priority: normalizePriority(priority),
  };

  tasks.push(newTask);
  sortAndPersist();
  renderTasks(tasks);
}

/**
 * Edit an existing task by ID.
 * @param {number} id
 * @param {Partial<import("./storage").Task>} updates
 */
export function editTask(id, updates) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks[index] = {
      ...tasks[index],
      ...updates,
      priority: normalizePriority(updates.priority || tasks[index].priority),
    };
    sortAndPersist();
    renderTasks(tasks);
  }
}
