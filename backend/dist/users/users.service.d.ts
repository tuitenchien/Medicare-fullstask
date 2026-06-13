import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Doctor } from '../doctors/doctors.entity';
export declare class UsersService {
    private userRepo;
    private doctorRepo;
    private appointmentRepo;
    constructor(userRepo: Repository<User>, doctorRepo: Repository<Doctor>, appointmentRepo: Repository<Appointment>);
    create(user: Partial<User>): Promise<Partial<User> & User>;
    findByCccdForLogin(cccd: string): Promise<User | null>;
    findByCccd(cccd: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    removeDoctor(doctorId: number): Promise<{
        message: string;
    }>;
}
