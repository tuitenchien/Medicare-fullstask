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
exports.MedicalRecordController = void 0;
const common_1 = require("@nestjs/common");
const medicalRecord_service_1 = require("./medicalRecord.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const jwt_roles_guard_1 = require("../auth/guards/jwt-roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
let MedicalRecordController = class MedicalRecordController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(id, body) {
        return this.service.create(Number(id), body);
    }
    getMy(req) {
        return this.service.findByPatient(req.user.sub);
    }
};
exports.MedicalRecordController = MedicalRecordController;
__decorate([
    (0, common_1.Post)(':appointmentId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.DOCTOR),
    __param(0, (0, common_1.Param)('appointmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.PATIENT),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "getMy", null);
exports.MedicalRecordController = MedicalRecordController = __decorate([
    (0, common_1.Controller)('medical-records'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jwt_roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [medicalRecord_service_1.MedicalRecordService])
], MedicalRecordController);
//# sourceMappingURL=medicalRecord.controller.js.map