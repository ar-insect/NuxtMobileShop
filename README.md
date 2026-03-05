# NuxtShop Mobile App

This is a React Native mobile application for NuxtShop, built with Expo, TypeScript, NativeWind (Tailwind CSS), and Zustand.

## Prerequisites

- Node.js (v18+)
- NuxtShop backend running on port 4000 (http://localhost:4000)
- iOS Simulator (Mac) or Android Emulator

## Setup

1.  **Install Dependencies**:
    ```bash
    cd mobile-app
    npm install
    ```

2.  **Start the Backend**:
    Ensure the Nuxt backend is running in a separate terminal:
    ```bash
    # In the root NuxtShop directory
    npm run dev
    ```

3.  **Start the Mobile App**:
    ```bash
    # In the mobile-app directory
    npm start
    ```
    - Press `i` to open in iOS Simulator.
    - Press `a` to open in Android Emulator.

## Project Structure

- `src/components`: Reusable UI components (ProductCard, etc.)
- `src/screens`: Application screens (Home, Login, Cart, etc.)
- `src/store`: Zustand state management stores (Auth, Cart, Products)
- `src/navigation`: React Navigation setup (Tabs, Stack)
- `src/utils`: Utility functions (API client)
- `src/types`: TypeScript interfaces

## Features

- **Authentication**: Login with `admin` / `123456`.
- **Products**: Browse products and view details.
- **Cart**: Add items, update quantities, remove items.
- **Orders**: View order history (mocked via backend).
- **Profile**: User profile and settings.

## Note on Styling

This project uses `nativewind` for styling. If you see styling issues, ensure `tailwind.config.js` is correctly configured and the babel plugin is active.
