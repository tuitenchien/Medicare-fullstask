import { AppointmentsService } from './appointment.service';
export declare class AppointmentsController {
    private service;
    constructor(service: AppointmentsService);
    create(req: any, body: any): Promise<import("./appointment.entity").Appointment>;
    getMy(req: any): Promise<import("./appointment.entity").Appointment[]>;
    getDoctor(req: any): Promise<import("./appointment.entity").Appointment[]>;
    confirm(id: string, req: any): Promise<import("./appointment.entity").Appointment>;
    reject(id: string, req: any): Promise<import("./appointment.entity").Appointment>;
    cancel(id: number, req: any): Promise<import("./appointment.entity").Appointment>;
    complete(id: string, req: any): Promise<import("./appointment.entity").Appointment>;
    findAllForAdmin(req: any): Promise<{
        id: number;
        patientId: number;
        patientName: string;
        doctorId: number;
        doctorName: string;
        appointmentDate: Date;
        status: import("../common/enums/appointment").AppointmentStatus;
    }[]>;
}
