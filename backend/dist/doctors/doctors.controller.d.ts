import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './create-doctor.dto';
export declare class DoctorsController {
    private doctorsService;
    constructor(doctorsService: DoctorsService);
    findAll(): Promise<import("./doctors.entity").Doctor[]>;
    getProfile(req: any): Promise<import("./doctors.entity").Doctor | null>;
    createDoctor(body: CreateDoctorDto): Promise<import("./doctors.entity").Doctor>;
}
