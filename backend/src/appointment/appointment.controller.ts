import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
  Req,
} from '@nestjs/common';

import { AppointmentsService } from './appointment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private service: AppointmentsService) { }

  @Post()
  @Roles(Role.PATIENT)
  create(@Request() req, @Body() body) {
    return this.service.create(
      req.user.sub,
      body.doctorId,
      body.appointmentDate,
    );
  }
  @Get('my')
  @Roles(Role.PATIENT)
  getMy(@Request() req) {
    return this.service.findByPatient(req.user.sub);
  }

  @Get('doctor')
  @Roles(Role.DOCTOR)
  getDoctor(@Request() req) {
    return this.service.findByDoctor(req.user.sub);
  }

  @Post(':id/confirm')
  confirm(@Param('id') id: string, @Request() req) {
    return this.service.confirm(Number(id), req.user.sub);
  }
  @Post(':id/reject')
  @Roles(Role.DOCTOR)
  reject(@Param('id') id: string, @Request() req) {
    return this.service.reject(Number(id), req.user.sub);
  }
  @Post(':id/cancel')
  @Roles(Role.PATIENT)
  cancel(
    @Param('id', ParseIntPipe) id: number,
    @Req() req
  ) {
    const userId = req.user.sub;
    return this.service.cancel(id, userId);
  }
  @Post(':id/complete')
  @Roles(Role.DOCTOR)
  complete(@Param('id') id: string, @Request() req) {
    return this.service.complete(Number(id), req.user.sub);
  }
  @Get('admin')
  @Roles(Role.ADMIN)
  findAllForAdmin(@Request() req) {
    return this.service.findAll();
  }

}