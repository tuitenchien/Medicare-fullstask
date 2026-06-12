"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctors_entity_1 = require("./doctors.entity");
const users_entity_1 = require("../users/users.entity");
const bcrypt = __importStar(require("bcrypt"));
let DoctorsService = class DoctorsService {
    doctorRepo;
    userRepo;
    constructor(doctorRepo, userRepo) {
        this.doctorRepo = doctorRepo;
        this.userRepo = userRepo;
    }
    async create(data, user) {
        const doctor = this.doctorRepo.create({
            ...data,
            user,
        });
        return this.doctorRepo.save(doctor);
    }
    async findAll() {
        return this.doctorRepo.find({
            relations: { user: true },
        });
    }
    async findById(id) {
        const doctor = await this.doctorRepo.findOne({
            where: { id },
            relations: { user: true },
        });
        if (!doctor)
            throw new common_1.NotFoundException('Doctor not found');
        return doctor;
    }
    async findByUserId(userId) {
        return this.doctorRepo.findOne({
            where: {
                user: { id: userId },
            },
        });
    }
    async createDoctor(dto) {
        const { cccd, password, fullName, specialty, phone } = dto;
        const existing = await this.userRepo.findOne({
            where: { cccd },
        });
        if (existing) {
            throw new Error('CCCD already exists');
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await this.userRepo.save({
            cccd,
            password: hash,
            role: 'doctor',
        });
        const doctor = this.doctorRepo.create({
            fullName,
            specialty,
            phone,
            user,
        });
        return this.doctorRepo.save(doctor);
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctors_entity_1.Doctor)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map