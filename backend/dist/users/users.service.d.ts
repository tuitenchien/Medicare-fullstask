import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(user: Partial<User>): Promise<Partial<User> & User>;
    findByCccd(cccd: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    remove(id: number): Promise<User>;
}
