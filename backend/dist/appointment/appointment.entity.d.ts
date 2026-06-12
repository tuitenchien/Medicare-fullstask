import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';
import { AppointmentStatus } from '../common/enums/appointment';
export declare class Appointment {
    id: number;
    patient: Patient;
    doctor: Doctor;
    appointmentDate: Date;
    status: AppointmentStatus;
}
