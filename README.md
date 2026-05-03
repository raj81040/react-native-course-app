# 📱 React Native Course App (Assessment Project)

Hey 👋
This is a React Native app built using **Expo + TypeScript** as part of an assessment project.

The app simulates a simple e-learning platform where users can log in, browse courses, bookmark them, and view course content inside a WebView.

---

# 🚀 Features

## 🔐 Authentication

* Login and Register screens (dummy authentication using API)
* Token stored securely using Expo SecureStore
* Auto login when app restarts
* Logout functionality

---

## 📚 Course Catalog

* Fetch courses from DummyJSON API
* Fetch users as instructors
* Search courses by title
* Bookmark courses
* Pull to refresh support
* Optimized list rendering using LegendList

---

## 📖 Course Details

* Full course information screen
* Instructor details
* Course description
* Bookmark toggle
* Enroll button (UI only)

---

## 🌐 WebView Integration

* Each course has a WebView screen
* Displays course content using dynamic HTML
* Native app passes data to WebView via route params and headers

---

## 🔔 Notifications

* Local notifications using Expo Notifications
* Trigger notification when user bookmarks 5+ courses
* Reminder notification if user is inactive for 24 hours

---

## 📶 Offline Support

* Detects internet connection using NetInfo
* Shows offline banner when user is disconnected

---

## ⚡ Performance Improvements

* Used LegendList instead of FlatList for better performance
* Memoized list items using useCallback
* Clean component-based architecture

---

# 🧱 Tech Stack

* React Native (Expo SDK)
* TypeScript
* Expo Router (navigation)
* Zustand (state management)
* NativeWind (Tailwind styling)
* Expo SecureStore (secure token storage)
* AsyncStorage (local persistence)
* Expo Notifications (local notifications)
* NetInfo (network detection)
* LegendList (optimized list rendering)

---

# 📂 Project Structure

```txt
app/                 → Screens (Expo Router)
src/
 ├── components/     → Reusable UI components
 ├── store/          → Zustand state management
 ├── services/       → API calls
 ├── utils/          → Helpers
```

---

# ⚙️ Setup Instructions

## 1. Install dependencies

```bash
npm install
```

## 2. Start project

```bash
npx expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
