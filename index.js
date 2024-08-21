import express from "express";
import connectDB from "./db.js"; // MongoDB connection
import imageRoutes from "./routes/imageRoutes.js"; // Image routes
import cors from "cors";

const app = express();
const corsOptions = {
    origin: ['http://localhost:3000','https://my-image-app-ruby.vercel.app'],
    credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000; // Use the port from .env, or default to 4000

// Middleware to parse JSON requests
app.use(express.json({ limit: '100mb' }));

// Connect to MongoDB directly with the URL
connectDB('mongodb+srv://abhinavchoudharyofficial:abhi123@cluster0.qy14qdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Use the image routes from `imageRoutes.js`
app.use('/api', imageRoutes); // Mount all image-related routes under the '/api' path

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
