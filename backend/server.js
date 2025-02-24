import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"

//configure env
dotenv.config();
//databse config
connectDB();



//rest object
const app = express();
const _dirname=path.resolve();
//middelwares
const corsOptions={
  origin:"https://freshguard-1.onrender.com",
  credentials:true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
//routes
app.use("/api/v1/auth", authRoutes);
app.use(express.static(path.join(_dirname,"myapp/dist")));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(_dirname, 'myapp/dist', 'index.html'))
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
