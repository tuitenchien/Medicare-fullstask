import { AppointmentsService } from './appointment.service';
export declare class AppointmentsController {
    private service;
    constructor(service: AppointmentsService);
    create(req: any, body: any): Promise<import("./appointment.entity").Appointment>;
    getMy(req: any): Promise<import("./appointment.entity").Appointment[]>;
    getDoctor(req: any): Promise<import("./appointment.entity").Appointment[]>;
    confirm(id: string): Promise<import("./appointment.entity").Appointment>;
    findAllForAdmin(req: any): Promise<import("./appointment.entity").Appointment[]>;
}
