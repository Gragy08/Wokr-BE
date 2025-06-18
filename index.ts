import express from 'express';
import cors from "cors";
import routes from "./routes/index.route";
import dotenv from "dotenv";
import { connectDB } from "./config/database";

// Nạp biến môi trường từ file .env
dotenv.config();

const app = express();
const port = 4000;

// Kết nối đến cơ sở dữ liệu
connectDB();

// Cấu hình CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Cho phép gửi cookie từ client
}));

// Cho phép gửi data lên dạng json
app.use(express.json());

// Thiết lập đường dẫn
app.use("/", routes);

app.listen(port, () => {
    console.log(`Project 2 Backend is running at http://localhost:${port}`);
})