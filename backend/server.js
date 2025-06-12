import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';

//configure env
dotenv.config();
//databse config
connectDB();



//rest object
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middelwares
app.use(cors({
  origin: ["https://freshguard-frontend.onrender.com"], 
  methods: ["GET", "POST"],
  credentials: true,
}));
app.options('*', cors());


app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
//routes
app.use("/api/v1/auth", authRoutes);


app.use(express.static(path.join(__dirname, "myapp/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "myapp/dist", "index.html"));
});




//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.VITE_MONGO_URL} mode on port ${PORT}`
  );
});
