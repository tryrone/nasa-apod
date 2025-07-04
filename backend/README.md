# NASA API Backend Starter Template

A TypeScript Node.js backend starter template with Express, featuring NASA API integration.

## 🚀 Quick Start

1. **Clone this template:**

   ```bash
   git clone <your-template-repo-url> my-new-project
   cd my-new-project
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/)

4. **Start development server:**
   ```bash
   yarn dev
   ```

## 📁 Project Structure

```
backend/
├── controllers/          # Request handlers
│   └── apodController.ts
├── routes/              # API route definitions
│   └── apodRoutes.ts
├── services/            # Business logic layer
├── utils/               # Utility functions
├── server.ts           # Main server file
├── package.json
└── tsconfig.json
```

## 🛠️ Available Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build TypeScript to JavaScript
- `yarn start` - Start production server
- `yarn watch` - Watch mode for TypeScript compilation
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```env
# NASA API Configuration
NASA_API_KEY=your_nasa_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Getting a NASA API Key

1. Visit [https://api.nasa.gov/](https://api.nasa.gov/)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env` file

## 📡 API Endpoints

- `GET /` - Health check
- `GET /api/apod` - Get NASA's Astronomy Picture of the Day
- `GET /api/apod?date=YYYY-MM-DD` - Get APOD for specific date

## 🎯 Customization

### Adding New Routes

1. Create a new controller in `controllers/`
2. Create a new route file in `routes/`
3. Import and use the route in `server.ts`

### Example: Adding a new endpoint

```typescript
// controllers/exampleController.ts
import { Request, Response } from "express";

export const getExample = async (req: Request, res: Response) => {
  res.json({ message: "Hello from example endpoint!" });
};

// routes/exampleRoutes.ts
import express from "express";
import { getExample } from "../controllers/exampleController";

const router = express.Router();
router.get("/", getExample);
export default router;

// server.ts
import exampleRoutes from "./routes/exampleRoutes";
app.use("/api/example", exampleRoutes);
```

## 🚀 Deployment

### Build for Production

```bash
yarn build
yarn start
```

### Environment Variables for Production

Make sure to set all required environment variables in your production environment.

## 📝 License

ISC

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
