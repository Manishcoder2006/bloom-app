# 🌿 Bloom
> A Hyper-Premium Luxury Footwear E-Commerce Application

![Bloom App Preview](./public/preview.png) <!-- Remember to replace with an actual screenshot! -->

Bloom is a full-stack, futuristic e-commerce platform curated for next-generation, high-end footwear. The application features a smooth, visually stunning "liquid-glass" user interface combined with a robust and secure backend.

## ✨ Key Features
- **Dynamic Catalog:** Browse featured and trending drops rendered dynamically via Firebase.
- **Complete Shopping Experience:** Seamless transition from product discovery to the shopping cart and checkout. 
- **User Accounts:** Secure authentication (Login/Signup), user states, and profile management tied to a real-time database. 
- **Admin Dashboard:** A fully protected admin panel embedded in the app to manage product inventory and update collections efficiently.
- **Glassmorphism UI:** Built with dark-mode tailored Tailwind CSS, featuring smooth hover states, custom glass gradients, animations, and typography.

## 🛠️ Tech Stack
- **Frontend Core:** [React.js v19](https://react.dev/) powered by [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/) icons
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Backend (BaaS):** [Firebase](https://firebase.google.com/) ecosystem:
  - **Firestore:** NoSQL Database for products and orders
  - **Firebase Auth:** User session management
  - **Firebase Storage:** Product image hosting
- **Deployment:** [Firebase Hosting](https://firebase.google.com/docs/hosting)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
- Node.js installed on your machine.
- A Firebase Project (with Firestore, Authentication, and Storage enabled).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Manishcoder2006/bloom-app.git
   cd bloom-app
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   - Create a `.env` file in the root directory.
   - Add your Firebase project credentials to the `.env` file:
     ```env
     VITE_FIREBASE_API_KEY=your_api_key_here
     VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
     ```

4. Start the development server for local testing:
   ```bash
   npm run dev
   ```

## 📞 Connect With Me
Built by [Manishcoder2006](https://github.com/Manishcoder2006)
