import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Appointment } from '../appointment/appointment.entity';
export declare class DashboardService {
    private userRepo;
    private appRepo;
    constructor(userRepo: Repository<User>, appRepo: Repository<Appointment>);
    getDashboard(): Promise<{
        users: {
            totalUsers: number;
            totalPatients: number;
            totalDoctors: number;
            totalAdmins: number;
        };
        appointments: {
            totalAppointments: number;
            pendingAppointments: number;
            confirmedAppointments: number;
            cancelledAppointments: number;
        };
    }>;
}
