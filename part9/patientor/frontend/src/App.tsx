import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";
import { Entry } from "./types";
import { Diagnosis } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const Ent = ({ entry, diagnoses }: {entry:Entry,diagnoses:Diagnosis[]}) => {

  const diagnosesNames : string[] = [];

  if(entry.diagnosisCodes !== undefined){

    for (const code of entry.diagnosisCodes){

      for(const diag of diagnoses){

        if(diag.code === code) {

          diagnosesNames.push(diag.name);
        }

      }

    }

  }

  let i = 0;  

  return(
    <div>

      <p>{entry.date} <em>{entry.description}</em></p>
      
      <ul>
        {entry.diagnosisCodes?.map(code =>{
          return(
            <li key={code}>{code} {diagnosesNames[i++]}</li>
          )
        })}
      </ul>
    </div>
  )


}

const Pat = ({ pat, diagnoses }:{pat:Patient | undefined,diagnoses:Diagnosis[]}) =>{

  if(pat === undefined){
    return null;
  }

  return (
    <div>
      <br></br>
      <strong> {pat.name} </strong> {pat.gender}

      <p>SSN: {pat.ssn}</p>
      <p>Occupation: {pat.occupation}</p>

      <p><strong>Entries:</strong></p>

      {pat.entries.map(entry =>{
        return(
          <Ent key={entry.id} entry={entry} diagnoses={diagnoses}/>
        )
      })}


    </div>
  )
}

const App = () => {

  const [patients, setPatients] = useState<Patient[]>([]);

  const [patient, setPatient] = useState<Patient>();

  const [diagnoses,setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {

    const fetchDiagnoses = async () => {
      const diagnoses = await patientService.getDiagnoses();

      setDiagnoses(diagnoses);

    };
    void fetchDiagnoses();
  }, []);




  const match = useMatch('/patients/:id')


  useEffect(() => {
    
    const fetchPatient = async () => {

      const patient = await patientService.getPatient(match?.params.id);

      setPatient(patient);

    };

    void fetchPatient();

  }, [match]);


  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<Pat diagnoses={diagnoses} pat={patient}/> } />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
