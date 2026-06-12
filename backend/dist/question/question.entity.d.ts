import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';
export declare class Question {
    id: number;
    patient: Patient;
    doctor: Doctor;
    question: string;
    answer: string;
    createdAt: Date;
}
