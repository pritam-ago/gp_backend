import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import creationRoutes from "./routes/creationRoutes.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: ['http://localhost:5000', 'http://localhost:8081', 'exp://10.11.104.175:8081', 'http://localhost:19006'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials : true
}

app.use(cors(corsOptions));
app.options("*", cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", creationRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/api/auth/signup', (req, res) => {
  res.send('signup');
});
app.get('/api/generate', (req, res) => {
  res.send('generate');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
