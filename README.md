# Apogee Assignment - Action Item Manager

This is a minimalist, mobile-first Progressive Web App (PWA) built with **Vite + React + Tailwind CSS**. It focuses on speed, simplicity, and core web fundamentals.

## 🚀 Features

*   **Minimalist Design**: A "White Space" focused UI that reduces cognitive load.
*   **Smart Action Items**:
    *   **Remind**: Standard tasks.
    *   **Email**: Visual cue (✉️) for communication tasks.
    *   **Invite**: Visual cue (📅) for meetings.
    *   **Prioritize**: Highlights items in **RED** and auto-sorts them to the top.
*   **Offline Persistence**: Everything is saved to `localStorage` instantly. Works without internet.
*   **Responsive**: Designed to look like a Native App on mobile and a focused tool on desktop.

---

## 📝 Interview Questions & Answers

### Question 1: Tell us something not in your resume.
**My Passion for Cognitive Science & Design Philosophy.**
While my resume highlights my technical skills in full-stack development, it doesn't capture my deep interest in how the human brain processes information. I spend my weekends reading about **Cognitive Load Theory**. This passion directly influences my coding style—I don't just build "features"; I try to remove friction.
For example, in this assignment, I avoided complex forms in favor of simple "Category Toggles" because recognizing an icon (Email/Calendar) is faster for the brain than reading a dropdown menu. I believe great software should feel invisible.

### Question 2: Simple Mobile App to List API Items
**1. Steps to Build:**
*   **Setup**: Initialize a React project using Vite.
*   **Service**: Write a clean `api.js` file using `fetch` to handle requests.
*   **State**: Use `useState` for the list and `isLoading` for UI feedback.
*   **Rendering**: Map the items into a vertically scrolling list.
*   **Optimization**: Implement "Virtualization" (e.g., `react-window`) if the list exceeds 1000 items to maintain 60fps scrolling.

**2. Considerations:**
*   **Network**: Show a "Skeleton Loader" while fetching.
*   **Errors**: Handle 404/500 errors gracefully with a "Retry" button.
*   **Device**: Ensure touch targets are at least 44x44px for thumbs.

**3. Debugging Risks:**
*   **CORS Issues**: Browser blocking requests. *Fix: Check server headers or use a proxy.*
*   **Slow Data**: API taking too long. *Fix: Implement pagination or lazy loading.*
*   **Bad Data**: API returns unexpected nulls. *Fix: Use Optional Chaining (`?.`) and extensive PropType/TypeScript validation.*

### Question 3: Action Item Manager Implementation
**1. Strategic Approach:**
I chose a **Hybrid/PWA Approach** using **Capacitor** (conceptually) or standard Web APIs. As a core web developer, this allows me to leverage the robust React ecosystem to build a "Write Once, Run Everywhere" application without the fragility of complex native build chains.

**2. Implementation Plan:**
*   **Foundation**: React + Tailwind for rapid, beautiful UI.
*   **Data Structure**: Flat object array with `category` tags (`remind`, `email`, etc.).
*   **Priority Logic**: A custom sort function that always floats `priority` items to the top.
*   **Offline First**: `localStorage` mirrors the state for instant load times.

**3. Web vs Mobile Interface:**
*   **Input**: On Mobile, the input bar is **Sticky at the Bottom** (thumb reach). On Web, it could be at the Top or Center.
*   **Navigation**: Mobile uses Bottom Tabs; Web uses Sidebar/Top Nav.
*   **Interactions**: Mobile relies on Swipe Gestures; Web relies on Hover States (implemented in this app).

**4. Offline & Caching:**
*   **Strategy**: Cache the entire user state in `localStorage`.
*   **Invalidation**: For a collaborative app, I would implement "Last Write Wins" or a server-side timestamp check. If `server_timestamp > local_timestamp`, prompt user to merge. For this personal assignment, simplistic overwrite is sufficient and robust.

---

## 🛠️ How to Run

Can run in two terminals:

### Terminal 1: Backyard (Server)
```bash
cd server
npm install
npm start
```

### Terminal 2: Frontend (Client)
```bash
cd client
npm install
npm run dev
```

The app will now use your **MongoDB Atlas** database!


## 📱 How to Run on Mobile (Android)
I have already set up **Capacitor** for you. To run this on an Android device/emulator:

1.  **Sync Web to Native**:
    ```bash
    npx cap sync
    ```
2.  **Open in Android Studio**:
    ```bash
    npx cap open android
    ```
3.  **Run**:
    -   Click the "Run" (Play) button in Android Studio.
    -   Make sure you have an Emulator or actual device connected.

    -   Make sure you have an Emulator or actual device connected.

*Note: Since this is a Hybrid app, any changes you make to the React code just need `npm run build && npx cap sync` to show up in the mobile app.*

## ⚡ Quick Live Demo (WiFi)
If you don't want to install Android Studio, you can demo it on your phone via WiFi:

1.  **Run with Host**:
    ```bash
    npm run dev -- --host
    ```
2.  **Find IP**: The terminal will show `Network: http://192.168.x.x:5173`.
3.  **Connect**: Connect your phone to the **same WiFi**.
4.  **Browse**: Open Chrome/Safari on your phone and type that IP address.
    *   *Tip: Add to Home Screen on your phone to hide the browser bar and make it look like a real app!*
