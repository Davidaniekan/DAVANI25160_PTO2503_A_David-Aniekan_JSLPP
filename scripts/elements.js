/**
 * @module elements
 * Centralized place to query and export DOM elements used across modules.
 * This file intentionally exports only DOM references (no logic).
 */

/** @typedef {import("./storage.js").Task} Task */

// Existing task modal (view/edit)
export const taskTitleInput = document.getElementById("task-title");
export const taskDescriptionInput = document.getElementById("task-description");
export const taskStatusSelect = document.getElementById("task-status");
export const taskPrioritySelect = document.getElementById("task-priority");
export const modalBackdrop = document.getElementById("modal-backdrop");
export const closeModalBtn = document.getElementById("close-modal");
export const editTaskForm = document.getElementById("edit-task-form");
export const deleteBtn = document.getElementById("delete-btn");

// New task modal
export const newTaskBtn = document.querySelectorAll(".newTaskBtn");
export const modalNewTask = document.getElementById("modal-new-task");
export const newTaskCloseBtn = document.getElementById("new-task-close-modal");
export const newTaskTitleInput = document.getElementById("new-task-title");
export const newTaskDescriptionInput = document.getElementById("new-task-description");
export const newTaskStatusSelect = document.getElementById("new-task-status");
export const newTaskPrioritySelect = document.getElementById("new-task-priority");
export const createTaskBtn = document.getElementById("create-task-btn");
export const newTaskForm = document.getElementById("new-task-form");

// Delete Confirmation modal
export const confirmModal = document.getElementById("confirm-modal");
export const confirmYes = document.getElementById("confirm-yes");
export const confirmNo = document.getElementById("confirm-no");

// SideBar
export const sidebar = document.getElementById("sidebar");
export const hideSidebarBtn = document.getElementById("hide-sidebar-btn");
export const eyeBtn = document.getElementById("eye-btn");

// Theme Toggle
export const themeSwitch = document.getElementById("theme-switch");
export const themeSwitchMobile = document.getElementById("theme-switch-mobile");

// Mobile Navigation Modal
export const logoLightIcon = document.getElementById("logo-mobile");
export const logoDarkIcon = document.getElementById("dark-logo-mobile");
export const mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");
export const mobileNavClose = document.getElementById("mobile-nav-close");
export const mobileBoardBtn = document.getElementById("mobile-board-btn");
