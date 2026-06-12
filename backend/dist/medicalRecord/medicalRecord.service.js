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
exports.MedicalRecordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const medicalRecord_entity_1 = require("./medicalRecord.entity");
const appointment_entity_1 = require("../appointment/appointment.entity");
let MedicalRecordService = class MedicalRecordService {
    repo;
    apptRepo;
    constructor(repo, apptRepo) {
        this.repo = repo;
        this.apptRepo = apptRepo;
    }
    async create(appointmentId, data) {
        const appt = await this.apptRepo.findOne({
            where: { id: appointmentId },
            relations: {
                patient: true,
                doctor: true,
            }
        });
        if (!appt) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        const record = this.repo.create({
            ...data,
            appointment: appt,
        });
        return this.repo.save(record);
    }
    findByPatient(userId) {
        return this.repo.find({
            where: {
                appointment: {
                    patient: {
                        user: {
                            id: userId,
                        },
                    },
                },
            },
            relations: {
                appointment: {
                    patient: true,
                    doctor: true,
                },
            },
        });
    }
};
exports.MedicalRecordService = MedicalRecordService;
exports.MedicalRecordService = MedicalRecordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medicalRecord_entity_1.MedicalRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MedicalRecordService);
//# sourceMappingURL=medicalRecord.service.js.map