# Apogee Action Manager

A minimalist, high-performance task management application built for the Apogee software engineering assignment. This project leverages a **Web-Native** approach to deliver a seamless experience across Web and Mobile interfaces.

## 🏗️ Project Architecture
The application is built using a modern full-stack architecture, optimized for speed and "invisible" design logic.

* **Frontend:** React (Vite) with Tailwind CSS for a utility-first, responsive UI.
* **Mobile Bridge:** **Capacitor** to wrap the web application into a native Android container.
* **Backend:** Node.js with Express providing a RESTful API.
* **Database:** MongoDB Atlas for cloud data persistence.
* **Automation:** GitHub Actions (`android-build.yml`) for CI/CD pipeline automation.

## 🚀 Key Technical Features
* **Smart Categorization:** Task types (Remind, Email, Invite) are visually distinguished to reduce cognitive load.
* **Priority Intelligence:** A custom sorting algorithm ensures high-priority items are automatically anchored to the top of the user's view.
* **Hybrid Native Experience:** By utilizing Capacitor, the app accesses native mobile behaviors while maintaining a unified codebase.
* **Offline Resilience:** The application implements local persistence via `localStorage`, ensuring data remains accessible and interactive even without an internet connection.



## 🛠️ Implementation Details
### Mobile-First Strategy
The UI is designed with "thumb-reachability" in mind. On mobile devices, key interaction points are positioned for ergonomic ease, while the desktop view adapts to utilize available horizontal space.

### Data Consistency
The app follows a robust state management pattern:
1.  **State Synchronization:** React state handles real-time UI updates.
2.  **Persistent Storage:** Every change is mirrored to `localStorage` for instant session recovery.
3.  **Cloud Backup:** The backend ensures that data is stored securely in MongoDB for cross-device access.

## ⚙️ Setup & Execution

### 1. Server (Backend)
```bash
cd server
npm install
npm start
```
### 2. Client (Frontend)
``` bash
cd client
npm install
npm run dev
```

### 3. Mobile (Android)
```bash
npx cap sync
npx cap open android
```
## 👨‍💻 About the Developer
Abhishek Sahay - 
[Visit Portfolio 🌐](https://sahayabhishek.tech)