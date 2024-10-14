import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import otpRouter from "./routes/otp.routes.js";
import visitRouter from "./routes/visit.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/visits", visitRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

export { app }