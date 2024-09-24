import express from "express";
import dotenv from "dotenv";
import dbconnect from "./config/Db.js";
import morgan from "morgan";
import authroute from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryroutes.js";
import cors from "cors";
import path from "path"
import productRoutes from "./routes/productRoutes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

//cors enable
app.use(cors());

//db connection
dbconnect();
//config dotenv
dotenv.config({path:'./.env'});


//middleares
app.use(morgan("dev"));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname,'./client')))

//Routes
app.use("/api/v1/auth", authroute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);


//Port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
