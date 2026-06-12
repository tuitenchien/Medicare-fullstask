import { User } from '../users/users.entity';
export declare class Doctor {
    id: number;
    fullName: string;
    specialty: string;
    phone: string;
    user: User;
}
