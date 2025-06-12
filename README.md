# Product Inventory CRUD Application

A simple Laravel-based web application for managing a product inventory. It features a modern Bootstrap UI, AJAX-powered CRUD operations, and persistent storage using a JSON file. This project is ideal for learning Laravel, PHP, and modern frontend integration.

## Features

- List all products with real-time inventory value calculation
- Add new products with validation
- Edit existing products via modal forms
- Responsive, modern UI with Bootstrap 5
- AJAX (no page reloads) for all product operations
- Data stored in a JSON file (no database required)

## Tech Stack

- **Backend:** Laravel (PHP)
- **Frontend:** Bootstrap 5, TypeScript, Vite
- **AJAX:** Fetch API
- **Storage:** JSON file (`database/products.json`)

## Getting Started

### Prerequisites

- PHP >= 8.0
- Composer
- Node.js & npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AngeArsene/PHP_Skills_Test.git
   cd PHP_Skills_Test
   ```
2. **Install PHP dependencies:**
   ```sh
   composer install
   ```
3. **Install Node dependencies:**
   ```sh
   npm install
   ```
4. **Build frontend assets:**
   ```sh
   npm run build
   ```
5. **Create the products data file (if not present):**
   ```sh
   mkdir -p database
   echo [] > database/products.json
   ```
6. **Run the Laravel development server:**
   ```sh
   composer run dev
   ```
7. **Visit the app:**
   Open [http://localhost:8000](http://localhost:8000) in your browser.

## Usage

- **Add Product:** Click the "Create Product" button, fill the form, and submit.
- **Edit Product:** Click "Edit Product" next to any product, update the details, and save.
- **Total Inventory Value:** Displayed at the bottom of the table, updates automatically.

## Project Structure

- `app/Products.php` — Handles product data logic (read/write JSON)
- `app/Http/Controllers/ProductController.php` — API endpoints for products
- `resources/views/` — Blade templates for UI
- `resources/js/ajax/` — TypeScript frontend (AJAX, UI, events)
- `database/products.json` — Product data storage
- `routes/web.php` — Route definitions
