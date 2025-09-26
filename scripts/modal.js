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

/**
 * Delete a task by ID.
 * @param {number} id
 */
export function deleteTask(id) {
  const updatedTasks = tasks.filter((t) => t.id !== id);
  saveTasks(updatedTasks); // mutates exported tasks array to the filtered list
  renderTasks(updatedTasks);
}

/**
 * Wire up form submit (edit/save) and delete confirm handlers.
 * This function attaches listeners once.
 */
export function initModalHandlers() {
  // Edit existing task save
  if (editTaskForm) {
    editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!editTaskForm.checkValidity()) {
        editTaskForm.reportValidity(); // show browser validation
        return;
      }
      if (!currentTaskId) return;

      const task = tasks.find((t) => t.id === currentTaskId);
      if (task) {
        task.title = (taskTitleInput.value || "").trim();
        task.description = (taskDescriptionInput.value || "").trim();
        task.status = taskStatusSelect.value;
        task.priority = normalizePriority(taskPrioritySelect.value);

        // reorder and persist
        sortAndPersist();

        renderTasks(tasks);
        closeModal();
      }
    });
  }

  // Delete flow: show confirmation modal
  if (deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!currentTaskId) return;

      if (confirmModal) confirmModal.style.display = "flex";
    });
  }

  // Confirm yes -> delete
  if (confirmYes) {
    confirmYes.addEventListener("click", (e) => {
      e.preventDefault();
      if (!currentTaskId) return;

      const updated = tasks.filter((t) => t.id !== currentTaskId);
      saveTasks(updated);
      sortAndPersist(); // will persist sorted copy
      renderTasks(updated);

      if (confirmModal) confirmModal.style.display = "none";
      closeModal(); // close edit modal too after delete
    });
  }

  // Cancel deletion
  if (confirmNo) {
    confirmNo.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirmModal) confirmModal.style.display = "none"; // hide confirm, keep edit modal open
    });
  }

  // Close modal buttons and backdrop click
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
}
