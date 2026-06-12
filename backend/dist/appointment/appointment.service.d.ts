import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';
export declare class AppointmentsService {
    private appointmentRepo;
    private patientRepo;
    private doctorRepo;
    constructor(appointmentRepo: Repository<Appointment>, patientRepo: Repository<Patient>, doctorRepo: Repository<Doctor>);
    create(userId: number, doctorId: number, date: Date): Promise<Appointment>;
    findByPatient(userId: number): Promise<Appointment[]>;
    findByDoctor(userId: number): Promise<Appointment[]>;
    confirm(id: number): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
}
