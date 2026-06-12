import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';
export declare class QuestionsService {
    private repo;
    private patientRepo;
    private doctorRepo;
    constructor(repo: Repository<Question>, patientRepo: Repository<Patient>, doctorRepo: Repository<Doctor>);
    ask(userId: number, content: string): Promise<Question>;
    answer(id: number, doctorUserId: number, answer: string): Promise<Question>;
    findAll(): Promise<Question[]>;
}
