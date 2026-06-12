import { Repository } from 'typeorm';
import { MedicalRecord } from './medicalRecord.entity';
import { Appointment } from '../appointment/appointment.entity';
export declare class MedicalRecordService {
    private repo;
    private apptRepo;
    constructor(repo: Repository<MedicalRecord>, apptRepo: Repository<Appointment>);
    create(appointmentId: number, data: any): Promise<MedicalRecord[]>;
    findByPatient(userId: number): Promise<MedicalRecord[]>;
}
