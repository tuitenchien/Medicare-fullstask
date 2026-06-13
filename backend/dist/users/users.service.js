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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
const appointment_entity_1 = require("../appointment/appointment.entity");
const doctors_entity_1 = require("../doctors/doctors.entity");
let UsersService = class UsersService {
    userRepo;
    doctorRepo;
    appointmentRepo;
    constructor(userRepo, doctorRepo, appointmentRepo) {
        this.userRepo = userRepo;
        this.doctorRepo = doctorRepo;
        this.appointmentRepo = appointmentRepo;
    }
    create(user) {
        return this.userRepo.save(user);
    }
    async findByCccdForLogin(cccd) {
        return await this.userRepo
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.cccd = :cccd', { cccd })
            .getOne();
    }
    ;
    async findByCccd(cccd) {
        return await this.userRepo.findOne({
            where: { cccd },
        });
    }
    async findAll() {
        return await this.userRepo.find();
    }
    async findById(id) {
        const user = await this.userRepo.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async removeDoctor(doctorId) {
        const doctor = await this.doctorRepo.findOne({
            where: { id: doctorId },
            relations: { user: true },
        });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor not found');
        }
        const count = await this.appointmentRepo.count({
            where: {
                doctor: { id: doctorId },
            },
        });
        if (count > 0) {
            throw new common_1.BadRequestException(`Không thể xóa bác sĩ vì còn ${count} lịch hẹn`);
        }
        await this.doctorRepo.remove(doctor);
        return {
            message: 'Đã xóa bác sĩ thành công',
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(doctors_entity_1.Doctor)),
    __param(2, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map