import express from 'express';
import env from 'dotenv';
import { apiRouter } from './routers/index.js';

env.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}`);
});
