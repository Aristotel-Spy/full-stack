import express from 'express';


import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  

  res.status(200).json(diagnosisService.getAll())
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;