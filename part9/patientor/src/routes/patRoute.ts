import express from 'express';

import patientService from '../services/patientService';

import toNewPatientEntry from '../../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  
  res.status(200).json(patientService.getSafeData())
});

router.get('/:id', (req,res) =>{

  const id:string = req.params.id;

  res.status(200).json(patientService.getPatient(id));
  
})



router.post('/', (req, res) => {

    try {
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);

        res.json(addedEntry);
        
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
  


});

export default router;