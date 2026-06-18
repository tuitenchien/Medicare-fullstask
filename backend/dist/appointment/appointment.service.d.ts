import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentStatus } from '../common/enums/appointment';
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
    confirm(id: number, userId: number): Promise<Appointment>;
    reject(id: number, userId: number): Promise<Appointment>;
    cancel(id: number, userId: number): Promise<Appointment>;
    complete(id: number, userId: number): Promise<Appointment>;
    findAll(): Promise<{
        id: number;
        patientId: number;
        patientName: string;
        doctorId: number;
        doctorName: string;
        appointmentDate: Date;
        status: AppointmentStatus;
    }[]>;
}
