import { Appointment } from '../appointment/appointment.entity';
export declare class MedicalRecord {
    id: number;
    appointment: Appointment;
    diagnosis: string;
    prescription: string;
    notes: string;
}
