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

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();