import express from 'express';
import initializeRoutes from './app/routes/init.js';
import { APIError, NotFoundError } from './utils/api-errors.js';
import { error } from './utils/responseHandlers.js';
import 'dotenv/config';

const app = express();
const port = 5008;

// Middleware to parse JSON bodies
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
