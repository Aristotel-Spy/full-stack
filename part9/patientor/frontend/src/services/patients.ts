import axios from "axios";
import { Patient, PatientFormValues } from "../types";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getDiagnoses = async () =>{

  const response = await axios.get<Diagnosis[]>('http://localhost:3001/api/diagnoses');

  return response.data;
}

const getPatient = async (id:string | undefined) => {

  if( id === undefined){
    return;
  }

  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return response.data;
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, create , getPatient,getDiagnoses
};

