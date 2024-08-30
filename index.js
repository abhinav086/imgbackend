import express from "express";
import dbconnection from "./db.js"; // MongoDB connection
import imageRoutes from "./routes/imageRoutes.js"; // Image routes
import propertyRoutes from "./routes/propertyRoutes.js";
import AuthRoute from "./routes/auth.routes.js";
import dotenv from "dotenv";

import cors from "cors";

dotenv.config();

const app = express();
const corsOptions = {
    origin: ['http://localhost:3000','https://pioneerestate.vercel.app'],
    credentials: true
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 4001; // Use the port from .env, or default to 4000

// Middleware to parse JSON requests
app.use(express.json({ limit: '100mb' }));
app.use(express.json()); 

dbconnection(process.env.MONGO_URI);

// Connect to MongoDB directly with the URL
// Use the image routes from `imageRoutes.js`
app.use('/api', imageRoutes); // Mount all image-related routes under the '/api' path


// Use the property routes from `propertyRoutes.js`
app.use('/api', propertyRoutes); 

app.use('/0auth', AuthRoute);

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });