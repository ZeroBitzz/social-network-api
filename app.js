import express from 'express';
import usersRouter from './routes/users.js';
import thoughtsRouter from './routes/thoughts.js';

const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/thoughts', thoughtsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({
      'error message': err.message,
      'http status': err.status
    });
});

export default app;