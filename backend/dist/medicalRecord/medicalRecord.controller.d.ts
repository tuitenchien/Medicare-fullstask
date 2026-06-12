import { MedicalRecordService } from './medicalRecord.service';
export declare class MedicalRecordController {
    private service;
    constructor(service: MedicalRecordService);
    create(id: string, body: any): Promise<import("./medicalRecord.entity").MedicalRecord[]>;
    getMy(req: any): Promise<import("./medicalRecord.entity").MedicalRecord[]>;
}
