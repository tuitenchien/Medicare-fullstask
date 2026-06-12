import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
