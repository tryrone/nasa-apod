# 🚀 NASA Space Data Explorer

NASA Space Data Explorer is a full-stack web application that lets users interactively explore space and astronomy data using NASA's Open APIs. From stunning astronomy pictures to asteroid visualizations and Earth imagery, this project serves as a space enthusiast's control panel.

---

## ✨ Key Features

- **Astronomy Picture of the Day (APOD):** View stunning daily images/videos of the universe with explanations. Navigate through past dates.
- **Near Earth Object (NEO) Visualizer:** Explore asteroid data with interactive pie and bar charts showing hazardous object counts and daily NEO activity.
- **Mars Rover Photo Explorer:** Explore high-resolution photographs captured by NASA's Curiosity rover on Mars. Search by Martian day (Sol) and view images in a responsive gallery.
- **NASA Media Search:** Search NASA’s vast photo, video, and audio archive. View assets in a gallery with detailed metadata and download options.

---

## 🛠️ Tech Stack

### Frontend

- React + TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Recharts for data visualization
- React Query for data fetching & caching
- React Router for navigation

### Backend

- Node.js + Express
- TypeScript
- Axios for API calls
- Dotenv for environment config
- Helmet, CORS, express-rate-limit for security

---

## 🧭 NASA APIs Used

| Endpoint        | Feature                                 |
| --------------- | --------------------------------------- |
| `/apod`         | Astronomy Picture of the Day            |
| `/neo/feed`     | Near Earth Object (Asteroids)           |
| `/mars-rover`   | Mars Rover                              |
| `/image/search` | NASA Media Search (Image, Video, Audio) |

---

## 🗂️ Project Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── routes/           # Express routes for NASA APIs
│   │   ├── controllers/      # API logic and handlers
│   │   ├── utils/            # Fetch helpers, validators
│   │   └── app.ts            # Main Express server
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/       # UI and visualization components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API clients
│   │   └── App.tsx
│   └── .env
├── README.md
└── .gitignore
```
