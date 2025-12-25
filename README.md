# Premium Car Rental Platform

A production-ready, multi-module Car Rental Platform designed for seamless user experience, featuring a high-performance Mobile User App, Driver Companion App, and comprehensive Admin Dashboard.

## 🚀 Key Features

### 📱 User Mobile App (React Native + Expo)
-   **Modern UI/UX**: Built with NativeWind (TailwindCSS) and smooth animations using React Native Reanimated.
-   **Car Discovery**: Interactive list and map views for browsing vehicles.
-   **Booking Flow**: Seamless booking experience with real-time availability.
-   **Security**: Secure Authentication with JWT and OTP.

### 🚗 Driver App
-   **Real-time assignment**: Drivers receive booking requests instantly.
-   **Earnings Dashboard**: Track daily and weekly earnings.

### 💻 Admin Dashboard (Next.js)
-   **Fleet Management**: Add, update, and track vehicle status.
-   **Analytics**: Visual insights into revenue and booking trends.

## 🛠 Tech Stack

-   **Frontend**: React Native (Expo), NativeWind, Reanimated, Lucide Icons.
-   **Web/Admin**: Next.js 14, Tailwind CSS, Framer Motion.
-   **Backend**: Node.js, Express, MongoDB, Redis, JWT.
-   **DevOps**: Monorepo architecture, Docker ready.

## 📂 Project Structure

```
/apps
  /mobile   # User & Driver Mobile App
  /admin    # Admin Web Dashboard
/server     # Node.js backend API
```

## 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Backend**:
    ```bash
    cd server
    npm run dev
    ```

3.  **Start Mobile App**:
    ```bash
    cd apps/mobile
    npx expo start
    ```

4.  **Start Admin Dashboard**:
    ```bash
    cd apps/admin
    npm run dev
    ```

## 📜 Resume Description

**Car Rental Platform (React Native, Node.js, MongoDB)**
Architected and developed a full-stack car rental ecosystem featuring a high-fidelity mobile app with 60fps animations (Reanimated) and a Next.js admin dashboard. Implemented secure JWT auth, real-time booking management, and a scalable REST API on Node.js/Express handling complex vehicle availability logic.
# Luxe-cars-rental
