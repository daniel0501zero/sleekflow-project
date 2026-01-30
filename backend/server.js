import { config } from 'dotenv';
config();
import express from 'express'
const app = express();
import cors from 'cors'
const port = process.env.PORT;
import connectDB from './config/conn.js'
const url = process.env.MONGODB_URL;
import router from './routes/router.js'
import authRouter from './routes/UserRoutes.js'
import NotFound from './middleware/notFound.js'
import cookieParser from 'cookie-parser';

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/v1/users', authRouter);
app.use('/api/v1/todos', router);
app.use(NotFound)

await connectDB(url).then(() => console.log("Database connected")).catch((err) => console.log(err));

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`app listening at port ${port}`))
}

//export app for vercel deployment
export default app;