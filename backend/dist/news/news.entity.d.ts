import { Doctor } from '../doctors/doctors.entity';
export declare class News {
    id: number;
    title: string;
    content: string;
    doctor: Doctor;
    createdAt: Date;
}
