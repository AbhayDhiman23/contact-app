# Contact Management Web App - MERN Stack

## Overview
A simple yet functional Contact Management Web Application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- ✅ Add new contacts
- ✅ View all contacts
- ✅ Edit existing contacts
- ✅ Delete contacts
- ✅ Responsive design
- ✅ Real-time updates

## Tech Stack
- **Frontend**: React.js with Axios
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Styling**: CSS

## Setup Instructions

### Prerequisites
- Node.js installed
- npm package manager
- MongoDB Atlas account (free tier)

### Local Development

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Backend Setup**
   - Navigate to backend folder: `cd backend`
   - Configure MongoDB URI in `.env` file
   - Start backend: `npm start`
   - Backend runs on `http://localhost:5000`

3. **Frontend Setup**
   - Navigate to frontend folder: `cd frontend`
   - Start frontend: `npm start`
   - Frontend runs on `http://localhost:3000`

4. **Run Both Together**
   ```bash
   npm start
   ```

## Deployment

### Deploy to Render (Recommended for quick deployment)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect to GitHub repository
   - Select repository
   - Configure:
     - **Name**: contact-app
     - **Branch**: main
     - **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && npm install`
     - **Start Command**: `cd backend && npm start`
   - Add Environment Variables:
     - `MONGO_URI`: Your MongoDB connection string
     - `PORT`: 5000
   - Deploy

4. **Frontend Deployment**
   - Create another Web Service for frontend
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Set Backend URL in environment variables

### Alternative: Deploy to Railway or Heroku
Similar process - connect GitHub repo and configure environment variables.

## API Endpoints

- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get specific contact
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

## File Structure
```
contact-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Notes
- MongoDB free tier supports up to 512MB
- Render free tier has cold starts but suitable for practice/demo
- For production, consider paid hosting and database plans

## Author
Created for MERN Stack assessment
