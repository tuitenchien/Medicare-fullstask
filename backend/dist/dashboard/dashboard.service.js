"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const appointment_entity_1 = require("../appointment/appointment.entity");
const role_enum_1 = require("../common/enums/role.enum");
const appointment_1 = require("../common/enums/appointment");
let DashboardService = class DashboardService {
    userRepo;
    appRepo;
    constructor(userRepo, appRepo) {
        this.userRepo = userRepo;
        this.appRepo = appRepo;
    }
    async getDashboard() {
        const totalUsers = await this.userRepo.count();
        const totalPatients = await this.userRepo.count({
            where: { role: role_enum_1.Role.PATIENT },
        });
        const totalDoctors = await this.userRepo.count({
            where: { role: role_enum_1.Role.DOCTOR },
        });
        const totalAdmins = await this.userRepo.count({
            where: { role: role_enum_1.Role.ADMIN },
        });
        const totalAppointments = await this.appRepo.count();
        const pendingAppointments = await this.appRepo.count({
            where: { status: appointment_1.AppointmentStatus.PENDING },
        });
        const confirmedAppointments = await this.appRepo.count({
            where: { status: appointment_1.AppointmentStatus.CONFIRMED },
        });
        const cancelledAppointments = await this.appRepo.count({
            where: { status: appointment_1.AppointmentStatus.CANCELLED },
        });
        return {
            users: {
                totalUsers,
                totalPatients,
                totalDoctors,
                totalAdmins,
            },
            appointments: {
                totalAppointments,
                pendingAppointments,
                confirmedAppointments,
                cancelledAppointments,
            },
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map