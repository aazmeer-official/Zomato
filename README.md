# Zesty - Zomato-Style MERN Food Delivery App

Zesty is a full-stack food delivery and food discovery project inspired by modern apps like Zomato. It is built with the MERN stack and focuses on a video-first food browsing experience where users can watch food reels and food partners can upload food videos from a dedicated partner dashboard.

The project is split into two clear applications:

- **Customer/User App**: A polished food discovery frontend with home, explore/search, auth, and reels feed.
- **Food Partner App**: A separate partner experience with partner landing, partner auth, dashboard, food upload form, stats, and session-created uploads.

The backend already exposes authentication and food APIs, and the frontend is connected to those real routes without inventing fake endpoints.

---

## Project Status

This project currently includes:

- User registration, login, and logout
- Food partner registration, login, and logout
- Cookie-based JWT authentication
- Protected food feed for logged-in users
- Protected food creation for logged-in food partners
- Video upload using `multipart/form-data`
- ImageKit upload integration for videos
- React Router based frontend routing
- Axios API service with credentials enabled
- Responsive, animated, production-style UI
- Separate customer and partner layouts

---

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- CSS
- Local Storage for frontend session/profile helper state
- Responsive layouts and custom animations

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- cookie-parser
- cors
- multer
- ImageKit
- dotenv
- uuid
- method-override

### Database

- MongoDB
- Mongoose schemas for:
  - User
  - Food Partner
  - Food

---

## Folder Structure

```text
Zomato/
  Backend/
    server.js
    package.json
    src/
      app.js
      db/
        db.js
      controllers/
        auth.controller.js
        food.controller.js
      middlewares/
        auth.middleware.js
      models/
        user.model.js
        foodpartner.model.js
        food.model.js
      routes/
        auth.routes.js
        food.routes.js
      services/
        storage.services.js
    videos/

  Frontend/
    index.html
    package.json
    vite.config.js
    src/
      App.jsx
      main.jsx
      assets/
      components/
      pages/
      services/
      styles/
      utils/
```

---

## Backend Overview

The backend is an Express application connected to MongoDB using Mongoose. It handles authentication, cookies, protected routes, food creation, and food fetching.

### Backend Entry Files

| File | Purpose |
| --- | --- |
| `Backend/server.js` | Loads environment variables and starts the server on port `3000` |
| `Backend/src/app.js` | Creates the Express app, configures middleware, connects DB, and mounts routes |
| `Backend/src/db/db.js` | Connects to MongoDB using `process.env.dbURL` |

### Backend Middleware

The backend uses:

- `express.json()` for JSON request bodies
- `express.urlencoded()` for form parsing
- `cookie-parser` for reading cookies
- `cors` for frontend/backend communication with cookies
- `method-override`
- `multer` with memory storage for video upload

---

## Backend Data Models

### User Model

File:

```text
Backend/src/models/user.model.js
```

Fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `fullName` | String | Yes | User full name |
| `email` | String | Yes | Unique user email |
| `password` | String | No | Stored as hashed password |
| `createdAt` | Date | Auto | Added by timestamps |
| `updatedAt` | Date | Auto | Added by timestamps |

### Food Partner Model

File:

```text
Backend/src/models/foodpartner.model.js
```

Fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `fullName` | String | Yes | Partner or restaurant owner name |
| `email` | String | Yes | Unique partner email |
| `password` | String | No | Stored as hashed password |
| `createdAt` | Date | Auto | Added by timestamps |
| `updatedAt` | Date | Auto | Added by timestamps |

### Food Model

File:

```text
Backend/src/models/food.model.js
```

Fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | String | Yes | Food item name |
| `video` | String | Yes | Uploaded video URL from ImageKit |
| `description` | String | Yes | Food item description |
| `foodPartner` | ObjectId | No | Reference to the food partner that created it |

Important: The current backend food model does **not** include a `price` field.

---

## Backend API Routes

Base backend URL:

```text
http://localhost:3000
```

API prefix:

```text
/api
```

### Auth Routes

Mounted from:

```text
Backend/src/routes/auth.routes.js
```

Base path:

```text
/api/auth
```

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| POST | `/api/auth/user/register` | Register normal user | No |
| POST | `/api/auth/user/login` | Login normal user | No |
| GET | `/api/auth/user/logout` | Logout normal user | Cookie |
| POST | `/api/auth/food-partner/register` | Register food partner | No |
| POST | `/api/auth/food-partner/login` | Login food partner | No |
| GET | `/api/auth/food-partner/logout` | Logout food partner | Cookie |

### Food Routes

Mounted from:

```text
Backend/src/routes/food.routes.js
```

Base path:

```text
/api/food
```

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| POST | `/api/food` | Create food with video upload | Food partner cookie |
| GET | `/api/food` | Get all food items | User cookie |

---

## API Request and Response Examples

### Register User

Endpoint:

```http
POST /api/auth/user/register
```

Request body:

```json
{
  "fullName": "Ali Khan",
  "email": "ali@example.com",
  "password": "123456"
}
```

Success response:

```json
{
  "message": "USer Registered succesfully",
  "user": {
    "_id": "user_id",
    "email": "ali@example.com",
    "fullName": "Ali Khan"
  }
}
```

The backend also sets a cookie named:

```text
token
```

### Login User

Endpoint:

```http
POST /api/auth/user/login
```

Request body:

```json
{
  "email": "ali@example.com",
  "password": "123456"
}
```

Success response:

```json
{
  "message": "User Logged in succesfully",
  "user": {
    "_id": "user_id",
    "email": "ali@example.com",
    "fullName": "Ali Khan"
  }
}
```

### Register Food Partner

Endpoint:

```http
POST /api/auth/food-partner/register
```

Request body:

```json
{
  "fullName": "Zesty Kitchen",
  "email": "partner@example.com",
  "password": "123456"
}
```

Success response:

```json
{
  "message": "Food Partner Registered Successfully",
  "foodPartner": {
    "_id": "partner_id",
    "email": "partner@example.com",
    "fullName": "Zesty Kitchen"
  }
}
```

### Login Food Partner

Endpoint:

```http
POST /api/auth/food-partner/login
```

Request body:

```json
{
  "email": "partner@example.com",
  "password": "123456"
}
```

Success response:

```json
{
  "message": "FoodPartner Logged in succesfully",
  "foodPartner": {
    "_id": "partner_id",
    "email": "partner@example.com",
    "fullName": "Zesty Kitchen"
  }
}
```

### Create Food

Endpoint:

```http
POST /api/food
```

Auth:

```text
Food partner must be logged in.
Cookie token is required.
```

Request type:

```text
multipart/form-data
```

Form fields:

| Field | Type | Required |
| --- | --- | --- |
| `name` | Text | Yes |
| `description` | Text | Yes |
| `video` | File | Yes |

Success response:

```json
{
  "message": "Food Item created Successfully!",
  "food": {
    "_id": "food_id",
    "name": "Paneer Tikka Bowl",
    "video": "https://imagekit.io/uploaded-video-url",
    "description": "Smoky, creamy, and ready for late-night cravings.",
    "foodPartner": "partner_id"
  }
}
```

### Get Food Feed

Endpoint:

```http
GET /api/food
```

Auth:

```text
User must be logged in.
Cookie token is required.
```

Success response:

```json
{
  "message": "Food Items Fetched Succesfully",
  "foodItems": [
    {
      "_id": "food_id",
      "name": "Paneer Tikka Bowl",
      "video": "https://imagekit.io/uploaded-video-url",
      "description": "Smoky, creamy, and ready for late-night cravings.",
      "foodPartner": "partner_id"
    }
  ]
}
```

---

## Frontend Overview

The frontend is a Vite + React app with separate customer and partner experiences.

### Main Frontend Features

- Production-style landing page
- Food search/explore UI
- Category cards
- Featured food reels preview
- Popular dish display cards
- User login and register pages
- Partner landing page
- Partner login and register pages
- Partner dashboard
- Create food form
- Reels-style feed page
- Loading states
- Empty states
- Error states
- Responsive mobile navigation
- Separate partner theme and layout

---

## Frontend Routes

| Route | Page | Description |
| --- | --- | --- |
| `/` | Home | Customer landing page |
| `/feed` | Feed | Reels-style food feed |
| `/login` | User Login | Login page for normal users |
| `/register` | User Register | Register page for normal users |
| `/partner` | Partner Landing | Landing page for restaurants/food partners |
| `/partner/login` | Partner Login | Login page for food partners |
| `/partner/register` | Partner Register | Register page for food partners |
| `/partner/dashboard` | Partner Dashboard | Protected partner dashboard |
| `/partner/create-food` | Create Food | Protected food upload page |
| `/create-food` | Create Food | Alternate protected food upload page |

Old routes are redirected:

| Old Route | Redirects To |
| --- | --- |
| `/user/login` | `/login` |
| `/user/register` | `/register` |
| `/food-partner/login` | `/partner/login` |
| `/food-partner/register` | `/partner/register` |

---

## Frontend API Integration

Axios instance:

```text
Frontend/src/services/api.js
```

The frontend uses:

```js
withCredentials: true
```

This is required because the backend stores authentication in cookies.

Default API URL:

```text
http://localhost:3000/api
```

Environment variable support:

```text
VITE_API_URL
```

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Frontend Services

### Auth Service

File:

```text
Frontend/src/services/authService.js
```

Functions:

- `registerUser(payload)`
- `loginUser(payload)`
- `logoutUser()`
- `registerFoodPartner(payload)`
- `loginFoodPartner(payload)`
- `logoutFoodPartner()`

### Food Service

File:

```text
Frontend/src/services/foodService.js
```

Functions:

- `getFoods()`
- `createFood(formData)`

---

## Frontend Components

| Component | Purpose |
| --- | --- |
| `Navbar` | Main customer-facing navigation |
| `PartnerNav` | Partner app navigation |
| `Footer` | Footer for customer and partner areas |
| `FoodCard` | Displays food video/card and reel variant |
| `FoodForm` | Creates food using multipart form data |
| `ProtectedRoute` | Protects routes by role |
| `Loader` | Loading and skeleton UI |
| `EmptyState` | Empty state UI |
| `Alert` | Error/success/info messages |

---

## Authentication Flow

### User Flow

1. User registers or logs in from `/register` or `/login`.
2. Backend validates credentials.
3. Backend creates JWT token.
4. Backend stores token in cookie named `token`.
5. Frontend stores basic profile data in local storage for UI state.
6. User can access protected `/feed`.

### Food Partner Flow

1. Partner registers or logs in from `/partner/register` or `/partner/login`.
2. Backend validates credentials.
3. Backend creates JWT token.
4. Backend stores token in cookie named `token`.
5. Frontend stores basic partner profile data in local storage for UI state.
6. Partner can access `/partner/dashboard`.
7. Partner can upload food using `name`, `description`, and `video`.

---

## Environment Variables

Create a `.env` file inside:

```text
Backend/.env
```

Required variables:

```env
dbURL=your_mongodb_connection_string
SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
FRONTEND_URL=http://localhost:5173,http://127.0.0.1:5173
```

Optional frontend `.env` file:

```text
Frontend/.env
```

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/aazmeer-official/Zomato.git
cd Zomato
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

### 4. Configure Backend Environment

Create:

```text
Backend/.env
```

Add:

```env
dbURL=your_mongodb_connection_string
SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
FRONTEND_URL=http://localhost:5173,http://127.0.0.1:5173
```

### 5. Run Backend

```bash
cd Backend
node server.js
```

Backend runs on:

```text
http://localhost:3000
```

### 6. Run Frontend

```bash
cd Frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```powershell
npm.cmd run dev
```

---

## Running Production Build

Inside `Frontend`:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Important Implementation Details

### Cookies and CORS

The frontend sends cookies using Axios:

```js
withCredentials: true
```

The backend allows frontend origins using CORS:

```js
credentials: true
```

This is required for protected routes because authentication is cookie-based.

### Video Uploads

Food videos are uploaded from the frontend as:

```text
multipart/form-data
```

The exact backend field name is:

```text
video
```

The backend uploads the file to ImageKit and stores the returned URL in MongoDB.

### Local Storage Usage

The backend auth session is cookie-based. The frontend also stores basic profile data in local storage to manage UI state such as:

- Showing profile name in navbar
- Showing partner dashboard UI
- Tracking foods created during the current partner session

The actual protected API access still depends on the backend cookie.

---

## Current Limitations

The current backend does not yet include:

- Public food feed route for guests
- Price field in the food model
- Restaurant profile model
- Order/cart system
- Search API
- Likes/comments API
- Get current logged-in user API
- Get current logged-in food partner API
- Get foods uploaded only by the current partner

Because of this:

- `/feed` requires user login.
- Home page uses dummy visual cards for popular dishes when public food data is not available.
- Partner dashboard stores session-created food items locally after successful upload.

---

## Suggested Future Improvements

- Add public food discovery endpoint
- Add price, category, image, rating, and location fields to food model
- Add restaurant profile model
- Add user profile endpoint
- Add partner profile endpoint
- Add partner-specific food listing endpoint
- Add cart and ordering flow
- Add search/filter backend APIs
- Add likes, saves, and comments for reels
- Add refresh token or session validation endpoint
- Add deployment configuration for frontend and backend

---

## Scripts

### Backend

The backend currently does not define a dev script. Run it with:

```bash
node server.js
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## Project Summary

Zesty is a MERN full-stack food delivery and discovery application. It combines a customer-facing food app with a separate partner portal. Users can register, log in, and watch protected food reels. Food partners can register, log in, and upload food videos using the real backend API.

The frontend is built with React, Vite, React Router, Axios, and custom CSS. The backend is built with Node.js, Express, MongoDB, Mongoose, JWT, cookies, Multer, and ImageKit.

This project is designed as a strong foundation for a production-level food delivery platform with video-first discovery.
