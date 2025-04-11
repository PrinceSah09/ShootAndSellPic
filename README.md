# ShootAndSellPic

An image-based e-commerce application where users can browse, upload, purchase, and download high-quality photographs.

---

## Tech Stack

- **Vite** – Fast build tool for frontend development  
- **TypeScript** – Strongly typed JavaScript  
- **Redux Toolkit** – Scalable state management  
- **Tailwind CSS** – Utility-first CSS framework  
- **Firebase** – Authentication and backend services  
- **UI Libraries** – shadCN, Acertinity, Magic UI

---

## Core Features

- User authentication (Firebase)
- Upload and preview high-resolution images
- Image listing with responsive layout
- Purchase and download functionality
- Centralized state management with Redux
- Clean and modern UI

---

## Future Enhancements

- Image metadata (timestamp, device info, geolocation).
- Payment gateway integration.
- Copyright protection system.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/shoot-and-sell-pic.git
cd shoot-and-sell-pic
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
Create a Firebase project and enable Email/Password Authentication. Add the following to a .env file:

```env 
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```


### 4. Start the Development Server
```bash
npm run dev
```
#### Open the app at: http://localhost:5173


---


## Project Structure

```
shootAndSellPic/
├─ public/
│  ├─ comic shanns.otf
│  ├─ favicon.png
│  ├─ LICENSE.txt
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ (External)/
│  │  │  ├─ CardsCarousel/
│  │  │  │  └─ AppleCardsCarouselDemo.tsx
│  │  │  ├─ DotPatternLinearGradient/
│  │  │  │  └─ DotPatternLinearGradient.tsx
│  │  │  └─ magicui/
│  │  │     ├─ confetti.tsx
│  │  │     └─ dot-pattern.tsx
│  │  ├─ (Payments)/
│  │  │  ├─ BuyNow/
│  │  │  │  └─ Buynow.tsx
│  │  │  └─ Payment/
│  │  │     └─ Payment.tsx
│  │  ├─ Auth/
│  │  │  └─ Auth.tsx
│  │  ├─ Cart/
│  │  │  └─ Cart.tsx
│  │  ├─ FeatureProducts/
│  │  │  └─ Products.tsx
│  │  ├─ FeedbackForm/
│  │  │  └─ FeedbackForm.tsx
│  │  ├─ MenuItem/
│  │  │  └─ MenuItem.tsx
│  │  ├─ Navbar/
│  │  │  └─ Navbar.tsx
│  │  ├─ NavbarDemo/
│  │  │  └─ NavbarDemo.tsx
│  │  ├─ Products/
│  │  │  └─ Products.tsx
│  │  ├─ ui/
│  │  │  ├─ apple-cards-carousel.tsx
│  │  │  ├─ background-beams-with-collision.tsx
│  │  │  ├─ button.tsx
│  │  │  ├─ dropdown-menu.tsx
│  │  │  └─ sonner.tsx
│  │  ├─ Layout.tsx
│  │  ├─ ThemeProvider.tsx
│  │  └─ Toaster.tsx
│  ├─ firebase/
│  │  └─ config.ts
│  ├─ lib/
│  │  └─ utils.ts
│  ├─ redux/
│  │  ├─ hooks/
│  │  │  ├─ index.ts
│  │  │  ├─ use-outside-click.ts
│  │  │  └─ useAuthListener.ts
│  │  ├─ slices/
│  │  │  ├─ authSlice.ts
│  │  │  ├─ buyNowSlice.ts
│  │  │  ├─ cartSlice.ts
│  │  │  └─ themeSlice.ts
│  │  └─ store.ts
│  ├─ App.css
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ .gitignore
├─ components.json
├─ eslint.config.js
├─ index.html
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```


