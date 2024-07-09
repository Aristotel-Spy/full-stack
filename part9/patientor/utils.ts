import { NewPatientEntry } from "./src/types/Patient";

import { Gender } from "./src/types/Patient";




const isString = (text: unknown): text is string => {

    return typeof text === 'string' || text instanceof String; //instanceof is 
    //used in JS if string has been created as an object. like in java a reference
  
    //typeof text ==='string' if string has been created primitively.
  
  };

  const parseName = (name: unknown): string => {

    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
      }
    
      return name; //compiler knows it's of type string here, since it passed the if statement.
  };

  const parsedateOfBirth = (date: unknown): string => {

    if (!date || !isString(date)) {
        throw new Error('Incorrect or missing date');
      }
    
      return date; //compiler knows it's of type string here, since it passed the if statement.
  };

  const parseSsn = (ssn: unknown): string => {

    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
      }
    
      return ssn; //compiler knows it's of type string here, since it passed the if statement.
  };

  const parseOccupation = (occ: unknown): string => {

    if (!occ || !isString(occ)) {
        throw new Error('Incorrect or missing occ');
      }
    
      return occ; //compiler knows it's of type string here, since it passed the if statement.
  };


  const isVisibility = (param: string): param is Gender => 
    {
    return Object.values(Gender).map(g => g.toString()).includes(param);
  };
  
  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isVisibility(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };


  


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
      const newEntry: NewPatientEntry = {
        name:parseName(object.name),
        dateOfBirth:parsedateOfBirth(object.dateOfBirth),
        ssn:parseSsn(object.ssn),
        gender:parseGender(object.gender),
        occupation:parseOccupation(object.occupation),
        entries:[]
      };
  
      return newEntry;
    }
  
    throw new Error('Incorrect data: some fields are missing');
  };


export default toNewPatientEntry;