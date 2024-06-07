import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import initializeRoutes from './app/routes/init.js';
import initializeDb from './config/db.js';
import { APIError, NotFoundError } from './utils/api-errors.js';
import { error } from './utils/responseHandlers.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// Initialize routes
initializeRoutes(app);

app.use((req, res, next) => {
  next(new NotFoundError('Page not found'));
});

app.use((err, req, res, next) => {
  if (err instanceof APIError) {
    error(res, err);
  } else {
    error(res, new APIError(500, 'Internal Server Error'));
  }
});

app.listen(process.env.PORT, async () => {
  await initializeDb();
  console.log(`Example app listening on port ${process.env.PORT}`);
});
