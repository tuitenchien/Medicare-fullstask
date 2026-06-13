import { PatientsService } from './patients.service';
export declare class PatientsController {
    private patientsService;
    constructor(patientsService: PatientsService);
    getProfile(req: any): Promise<import("./patients.entity").Patient>;
    updateProfile(req: any, body: any): Promise<import("./patients.entity").Patient>;
    findAll(): Promise<import("./patients.entity").Patient[]>;
    findByUserId(id: string): Promise<import("./patients.entity").Patient>;
}
