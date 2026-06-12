import { User } from '../users/users.entity';
export declare class Patient {
    id: number;
    fullName: string;
    phone: string;
    dateOfBirth: Date;
    address: string;
    createdAt: Date;
    user: User;
}
