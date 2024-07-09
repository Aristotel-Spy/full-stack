


export type NewPatientEntry = Omit<Patient, 'id'>;
//this way you are ommiting the 'ssn' field.

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }


interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
  }

  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  interface OccupationalHealthcareEntry extends BaseEntry{
    type:"OccupationalHealthcare";
    employerName:string

    sickLeave?:{startDate:string
        endDate:string
    }
  }

  interface HospitalEntry extends BaseEntry{
    type:"Hospital";
    discharge:{
        date:string
        criteria:string
    }
  }

  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;



export interface Patient {
    id:string
    name:string
    dateOfBirth:string
    ssn:string
    gender:Gender
    occupation:string
    entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;