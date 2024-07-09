import patients from '../data/patients';

import { NonSensitivePatientEntry } from '../types/Patient';

import { NewPatientEntry } from '../types/Patient';

import { Patient } from '../types/Patient';

import { v4 as uuidv4 } from 'uuid';



const getSafeData = ():NonSensitivePatientEntry[] =>{

    return patients.map(patient =>{

        return {
            id:patient.id,
            name:patient.name,
            dateOfBirth:patient.dateOfBirth,
            gender:patient.gender,
            occupation:patient.occupation
        }
    });

}

const getPatient = (id:string) :Patient | undefined =>{

    //in case it doesn't find it. returns undefined.

    return patients.find(patient => {

        if(patient.id === id){

            return true;
        } else {
            return false;
        }
    })

}

const addPatient = (Entry:NewPatientEntry):Patient =>{

    const id = uuidv4(); 


    const newPatientEntry = {
        id:id,
        name:Entry.name,
        dateOfBirth:Entry.dateOfBirth,
        ssn:Entry.ssn,
        gender:Entry.gender,
        occupation:Entry.occupation,
        entries:Entry.entries
        
      };
    
      patients.push(newPatientEntry);
      return newPatientEntry;
};




export default {
    getSafeData,
    addPatient,
    getPatient
}