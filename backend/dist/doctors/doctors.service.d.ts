import { Repository } from 'typeorm';
import { Doctor } from './doctors.entity';
import { User } from '../users/users.entity';
import { CreateDoctorDto } from './create-doctor.dto';
export declare class DoctorsService {
    private doctorRepo;
    private userRepo;
    constructor(doctorRepo: Repository<Doctor>, userRepo: Repository<User>);
    create(data: Partial<Doctor>, user: User): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
    findById(id: number): Promise<Doctor>;
    findByUserId(userId: number): Promise<Doctor | null>;
    createDoctor(dto: CreateDoctorDto): Promise<Doctor>;
}
