import express from 'express';
const app = express();

import diaRoute from './routes/diaRoute';

import patRoute from './routes/patRoute';

import cors from 'cors';

app.use(cors())

app.use(express.json());

const PORT = 3001;

app.use('/api/diagnoses',diaRoute)

app.use('/api/patients',patRoute)

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});