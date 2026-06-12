import { Patient } from './patients.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
export declare class PatientsService {
    private patientRepository;
    constructor(patientRepository: Repository<Patient>);
    create(data: {
        fullName: string;
        phone: string;
        dateOfBirth: string;
        address: string;
        user: User;
    }): Promise<Patient>;
    findByUserId(userId: number): Promise<Patient>;
    findAll(): Promise<Patient[]>;
    findOne(id: number): Promise<Patient>;
    update(userId: number, data: Partial<Patient>): Promise<Patient>;
}
