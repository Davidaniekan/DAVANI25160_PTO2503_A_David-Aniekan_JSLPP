# JSL Portfolio Piece: Kanban App Deployment & Features Implementation
---
## ✨ Project Overview

**Kanban Task Management** is a browser-based single-page application that helps you organize tasks using a classic Kanban workflow. The UI includes a persistent sidebar, responsive board columns, modals for creating/editing tasks, a theme toggle (light/dark), and a mobile-friendly navigation modal.

This repo demonstrates:
- Clean separation of concerns using ES6 modules (one responsibility per file)
- Persistent state with `localStorage`
- JSDoc-documented functions for maintainability
- Accessible, responsive UI with simple interactions
---
## 🌐 Live Demo

- **Check out the project here:** [Kanban Task Management Website](https://kanbanboardcareer.netlify.app/)
---
## 🎥 Presentation Video
- **Watch the presentation:** [Click here to watch](https://app.screencastify.com/watch/k4BkxYZrEv1f7JuGDW4i)

---

## 🧰 Technologies

- **HTML5** — semantic structure  
- **CSS3** — layout, responsive design, themes  
- **JavaScript (ES6 Modules)** — application logic, modular architecture  
- **LocalStorage** — persistence for tasks, theme, and sidebar state  
- **Google Fonts** — _Plus Jakarta Sans_ for typography

---

## 📂 Project Structure  
```bash
├── index.html
├── styles.css
├── assets/ # logos, icons, favicon...
└── scripts/
├── elements.js # DOM element references
├── storage.js # load/save tasks, nextTaskId helpers
├── sorting.js # sorting, priority helpers
├── render.js # renderTasks, updateColumnCounts
├── modal.js # open/close/edit/delete modal logic
├── newTask.js # new task modal + creation flow
├── dropdown.js # dropdown highlight helpers
├── ui.js # loading/error UI helpers
├── sidebar.js # sidebar toggle/init (with persistence)
├── theme.js # theme toggle (desktop + mobile)
├── mobileNav.js # mobile navigation handlers
└── main.js # app init and event wiring
```
---

## ✅ Features (Created & Updated)

### Core functionality
- ✅ **Add task** — Create tasks with title, description, status and priority.  
- ✅ **Edit task** — Open task modal, update details, and save.  
- ✅ **Delete task** — Confirmation modal for safe deletion.  
- ✅ **Persistent storage** — Tasks and UI preferences saved in `localStorage`.  
- ✅ **Priority & sorting** — Tasks sorted by status → priority → id (stable).  
- ✅ **Column counts** — Live counts in headers for TODO, DOING, DONE.

### UX & UI
- ✅ **Sidebar** — Persistent navigation and hide/show with eye button.  
- ✅ **Theme** — Light / Dark toggle (desktop + mobile) with persisted preference.  
- ✅ **Responsive** — Desktop grid layout + mobile modal navigation.  
- ✅ **Tooltips** — Priority dot tooltip on hover.  
- ✅ **Accessibility** — Form controls use labels; modals block background scrolling.

### Developer quality
- ✅ **Modular code** — Single responsibility modules (storage, rendering, modal, etc.).  
- ✅ **JSDoc** — Major functions documented with JSDoc for maintainability.  
- ✅ **Robust import-safe sidebar logic** — Handles module import order and DOM readiness.

---

## 🛠️ Setup Instructions 

### 1. Clone Repository  
```bash
git clone https://github.com/Davidaniekan/DAVANI25160_PTO2503_A_David-Aniekan_JSLPP.git
cd kanban-task-management
```
### 2. Open Project

```bash
open index.html
```
---
## ▶️ Usage Examples (Quick Start)
### Create a task

- Click + **Add New Task** (desktop) or + (mobile).

- Fill `Title`, `Description`, choose `Status` (todo/doing/done) and `Priority`.

- Click **Create Task**.
*Result: task appears in chosen column; tasks are sorted and persisted.*

### Edit a task

- Click a task card.

- Edit fields in the modal and click **Save Changes.**
*Result: task updates and list persists.*

### Delete a task

- In the edit modal, click **Delete Task**.

- Confirm in the confirmation modal.
*Result: task removed and UI updated.*

### Toggle sidebar

- Click **Hide Sidebar** to collapse it; use the **eye button** to restore.

- The sidebar state persists across sessions.

### Toggle theme

- Use the switch in the sidebar (desktop) or mobile menu. Theme preference persists.

---
## 👤 Author

Developed by **David Aniekan**
[GitHub](https://github.com/Davidaniekan) | [LinkedIn](https://linkedin.com/in/david-aniekan)