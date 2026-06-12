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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("./question.entity");
const patients_entity_1 = require("../patients/patients.entity");
const doctors_entity_1 = require("../doctors/doctors.entity");
let QuestionsService = class QuestionsService {
    repo;
    patientRepo;
    doctorRepo;
    constructor(repo, patientRepo, doctorRepo) {
        this.repo = repo;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
    }
    async ask(userId, content) {
        const patient = await this.patientRepo.findOne({
            where: { user: { id: userId } },
        });
        if (!patient) {
            throw new Error('Patient not found');
        }
        const q = this.repo.create({
            patient,
            question: content,
        });
        return this.repo.save(q);
    }
    async answer(id, doctorUserId, answer) {
        const q = await this.repo.findOne({ where: { id } });
        if (!q) {
            throw new Error('Question not found');
        }
        const doctor = await this.doctorRepo.findOne({
            where: { user: { id: doctorUserId } },
        });
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        q.answer = answer;
        q.doctor = doctor;
        return this.repo.save(q);
    }
    findAll() {
        return this.repo.find();
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(patients_entity_1.Patient)),
    __param(2, (0, typeorm_1.InjectRepository)(doctors_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionsService);
//# sourceMappingURL=question.service.js.map