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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./appointment.entity");
const appointment_1 = require("../common/enums/appointment");
const patients_entity_1 = require("../patients/patients.entity");
const doctors_entity_1 = require("../doctors/doctors.entity");
let AppointmentsService = class AppointmentsService {
    appointmentRepo;
    patientRepo;
    doctorRepo;
    constructor(appointmentRepo, patientRepo, doctorRepo) {
        this.appointmentRepo = appointmentRepo;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
    }
    async create(userId, doctorId, date) {
        const patient = await this.patientRepo.findOne({
            where: { user: { id: userId } },
        });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        const doctor = await this.doctorRepo.findOne({
            where: { id: doctorId },
        });
        if (!doctor)
            throw new common_1.NotFoundException('Doctor not found');
        const appointmentDate = new Date(date);
        if (isNaN(appointmentDate.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        if (appointmentDate < new Date()) {
            throw new common_1.BadRequestException('Appointment time must be in the future');
        }
        const conflictDoctor = await this.appointmentRepo.findOne({
            where: {
                doctor: { id: doctorId },
                appointmentDate: date,
                status: (0, typeorm_2.In)([
                    appointment_1.AppointmentStatus.PENDING,
                    appointment_1.AppointmentStatus.CONFIRMED,
                ]),
            },
        });
        if (conflictDoctor) {
            throw new common_1.BadRequestException('Doctor already booked');
        }
        const conflictPatient = await this.appointmentRepo.findOne({
            where: {
                patient: { id: patient.id },
                appointmentDate: date,
                status: (0, typeorm_2.In)([
                    appointment_1.AppointmentStatus.PENDING,
                    appointment_1.AppointmentStatus.CONFIRMED,
                ]),
            },
        });
        if (conflictPatient) {
            throw new common_1.BadRequestException('You already have an appointment at this time');
        }
        const appointment = this.appointmentRepo.create({
            patient,
            doctor,
            appointmentDate: date,
            status: appointment_1.AppointmentStatus.PENDING,
        });
        return this.appointmentRepo.save(appointment);
    }
    async findByPatient(userId) {
        return this.appointmentRepo.find({
            where: {
                patient: { user: { id: userId } },
            },
            relations: { doctor: true },
        });
    }
    async findByDoctor(userId) {
        return this.appointmentRepo.find({
            where: {
                doctor: { user: { id: userId } },
            },
            relations: { patient: true },
        });
    }
    async confirm(id, userId) {
        const appt = await this.appointmentRepo.findOne({
            where: { id },
            relations: { doctor: { user: true } },
        });
        if (!appt)
            throw new common_1.NotFoundException('Appointment not found');
        if (appt.doctor.user.id !== userId) {
            throw new common_1.BadRequestException('No permission');
        }
        if (appt.status !== appointment_1.AppointmentStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending appointments can be confirmed');
        }
        appt.status = appointment_1.AppointmentStatus.CONFIRMED;
        return this.appointmentRepo.save(appt);
    }
    async reject(id, userId) {
        const appt = await this.appointmentRepo.findOne({
            where: { id },
            relations: { doctor: { user: true } },
        });
        if (!appt)
            throw new common_1.NotFoundException('Appointment not found');
        if (appt.doctor.user.id !== userId) {
            throw new common_1.BadRequestException('No permission');
        }
        if (appt.status !== appointment_1.AppointmentStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending can reject');
        }
        appt.status = appointment_1.AppointmentStatus.REJECTED;
        return this.appointmentRepo.save(appt);
    }
    async cancel(id, userId) {
        const appt = await this.appointmentRepo.findOne({
            where: { id },
            relations: { patient: { user: true }, doctor: { user: true } },
        });
        if (!appt)
            throw new common_1.NotFoundException('Appointment not found');
        if (appt.patient.user.id !== userId &&
            appt.doctor.user.id !== userId) {
            throw new common_1.BadRequestException('No permission to cancel');
        }
        if (appt.status !== appointment_1.AppointmentStatus.PENDING &&
            appt.status !== appointment_1.AppointmentStatus.CONFIRMED) {
            throw new common_1.BadRequestException('Cannot cancel this appointment');
        }
        appt.status = appointment_1.AppointmentStatus.CANCELLED;
        return this.appointmentRepo.save(appt);
    }
    async complete(id, userId) {
        const appt = await this.appointmentRepo.findOne({
            where: { id },
            relations: { doctor: { user: true } },
        });
        if (!appt)
            throw new common_1.NotFoundException('Appointment not found');
        if (appt.doctor.user.id !== userId) {
            throw new common_1.BadRequestException('No permission');
        }
        if (appt.status !== appointment_1.AppointmentStatus.CONFIRMED) {
            throw new common_1.BadRequestException('Only confirmed appointments can be completed');
        }
        appt.status = appointment_1.AppointmentStatus.COMPLETED;
        return this.appointmentRepo.save(appt);
    }
    async findAll() {
        const data = await this.appointmentRepo.find({
            relations: {
                patient: true,
                doctor: true,
            },
        });
        return data.map(a => ({
            id: a.id,
            patientId: a.patient.id,
            patientName: a.patient.fullName,
            doctorId: a.doctor.id,
            doctorName: a.doctor.fullName,
            appointmentDate: a.appointmentDate,
            status: a.status,
        }));
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(patients_entity_1.Patient)),
    __param(2, (0, typeorm_1.InjectRepository)(doctors_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentsService);
//# sourceMappingURL=appointment.service.js.map