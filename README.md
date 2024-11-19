# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Co-working Space Booking System is a React-based booking system for managing co-working space reservations with different membership tiers and dynamic pricing.
Its features include:

15 desk booking system (10 individual, 5 team desks)
Three membership tiers for individual desks
Offers automatic 10% discount for bookings over 3 hours
Real-time price calculation
Revenue dashboard with booking history

To run this project, you need to follow these steps

# Clone the repository
git clone [https://github.com/Ebeleokolo/CoWorking]

# Navigate to project directory
cd co-working

# Install dependencies
npm install

# Install required packages
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Run the project 
npm run dev