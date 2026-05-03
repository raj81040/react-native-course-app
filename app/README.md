# 📱 React Native Course App (Assessment Project)

Hey 👋  
This is a React Native app built using **Expo + TypeScript** as part of an assessment project.  

The app simulates a simple e-learning platform where users can log in, browse courses, bookmark them, and view course content inside a WebView.

---

# 🚀 Features

## 🔐 Authentication
- Login and Register screens (dummy authentication using API)
- Token stored securely using Expo SecureStore
- Auto login when app restarts
- Logout functionality

---

## 📚 Course Catalog
- Fetch courses from DummyJSON API
- Fetch users as instructors
- Search courses by title
- Bookmark courses
- Pull to refresh support
- Optimized list rendering using LegendList

---

## 📖 Course Details
- Full course information screen
- Instructor details
- Course description
- Bookmark toggle
- Enroll button (UI only)

---

## 🌐 WebView Integration
- Each course has a WebView screen
- Displays course content using dynamic HTML
- Native app passes data to WebView via route params and headers

---

## 🔔 Notifications
- Local notifications using Expo Notifications
- Trigger notification when user bookmarks 5+ courses
- Reminder notification if user is inactive for 24 hours

---

## 📶 Offline Support
- Detects internet connection using NetInfo
- Shows offline banner when user is disconnected

---

## ⚡ Performance Improvements
- Used LegendList instead of FlatList for better performance
- Memoized list items using useCallback
- Clean component-based architecture

---

# 🧱 Tech Stack

- React Native (Expo SDK)
- TypeScript
- Expo Router (navigation)
- Zustand (state management)
- NativeWind (Tailwind styling)
- Expo SecureStore (secure token storage)
- AsyncStorage (local persistence)
- Expo Notifications (push/local notifications)
- NetInfo (network detection)
- LegendList (optimized list rendering)

---

# 📂 Project Structure
app/ → Screens (Expo Router)
src/
├── components/ → Reusable UI components
├── store/ → Zustand state management
├── services/ → API calls (login, courses)
├── utils/ → Helpers (storage, retry logic)



---

# ⚙️ Setup Instructions

## 1. Install dependencies
```bash
npm install

2. Start project
npx expo start

3. Run on device
Scan QR code using Expo Go app



🌐 API Used
DummyJSON API:

/auth/login → authentication
/products → used as courses
/users → used as instructors

⚠️ Known Limitations
No real backend (uses dummy APIs)
WebView content is static HTML
Notifications are local only
Profile stats are mock data