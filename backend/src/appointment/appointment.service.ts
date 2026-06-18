import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentStatus } from '../common/enums/appointment';
import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) { }

  async create(userId: number, doctorId: number, date: Date) {
    const patient = await this.patientRepo.findOne({
      where: { user: { id: userId } },
    });
    if (!patient) throw new NotFoundException('Patient not found');

    const doctor = await this.doctorRepo.findOne({
      where: { id: doctorId },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const appointmentDate = new Date(date);

    if (isNaN(appointmentDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    if (appointmentDate < new Date()) {
      throw new BadRequestException('Appointment time must be in the future');
    }

    const conflictDoctor = await this.appointmentRepo.findOne({
      where: {
        doctor: { id: doctorId },
        appointmentDate: date,
        status: In([
          AppointmentStatus.PENDING,
          AppointmentStatus.CONFIRMED,
        ]),
      },
    });

    if (conflictDoctor) {
      throw new BadRequestException('Doctor already booked');
    }

    const conflictPatient = await this.appointmentRepo.findOne({
      where: {
        patient: { id: patient.id },
        appointmentDate: date,
        status: In([
          AppointmentStatus.PENDING,
          AppointmentStatus.CONFIRMED,
        ]),
      },
    });

    if (conflictPatient) {
      throw new BadRequestException('You already have an appointment at this time');
    }

    const appointment = this.appointmentRepo.create({
      patient,
      doctor,
      appointmentDate: date,
      status: AppointmentStatus.PENDING,
    });

    return this.appointmentRepo.save(appointment);
  }


  async findByPatient(userId: number) {
    return this.appointmentRepo.find({
      where: {
        patient: { user: { id: userId } },
      },
      relations: { doctor: true },
    });
  }

  async findByDoctor(userId: number) {
    return this.appointmentRepo.find({
      where: {
        doctor: { user: { id: userId } },
      },
      relations: { patient: true },
    });
  }
  async confirm(id: number, userId: number) {
    const appt = await this.appointmentRepo.findOne({
      where: { id },
      relations: { doctor: { user: true } }, // 👈 BẮT BUỘC
    });

    if (!appt) throw new NotFoundException('Appointment not found');

    if (appt.doctor.user.id !== userId) {
      throw new BadRequestException('No permission');
    }

    if (appt.status !== AppointmentStatus.PENDING) {
      throw new BadRequestException('Only pending appointments can be confirmed');
    }

    appt.status = AppointmentStatus.CONFIRMED;
    return this.appointmentRepo.save(appt);
  }

  async reject(id: number, userId: number) {
    const appt = await this.appointmentRepo.findOne({
      where: { id },
      relations: { doctor: { user: true } },
    });

    if (!appt) throw new NotFoundException('Appointment not found');

    if (appt.doctor.user.id !== userId) {
      throw new BadRequestException('No permission');
    }

    if (appt.status !== AppointmentStatus.PENDING) {
      throw new BadRequestException('Only pending can reject');
    }

    appt.status = AppointmentStatus.REJECTED;
    return this.appointmentRepo.save(appt);
  }

  async cancel(id: number, userId: number) {
    const appt = await this.appointmentRepo.findOne({
      where: { id },
      relations: { patient: { user: true }, doctor: { user: true } },
    });

    if (!appt) throw new NotFoundException('Appointment not found');

    // check quyền
    if (
      appt.patient.user.id !== userId &&
      appt.doctor.user.id !== userId
    ) {
      throw new BadRequestException('No permission to cancel');
    }

    if (
      appt.status !== AppointmentStatus.PENDING &&
      appt.status !== AppointmentStatus.CONFIRMED
    ) {
      throw new BadRequestException('Cannot cancel this appointment');
    }

    appt.status = AppointmentStatus.CANCELLED;
    return this.appointmentRepo.save(appt);
  }

  async complete(id: number, userId: number) {
    const appt = await this.appointmentRepo.findOne({
      where: { id },
      relations: { doctor: { user: true } },
    });

    if (!appt) throw new NotFoundException('Appointment not found');

    if (appt.doctor.user.id !== userId) {
      throw new BadRequestException('No permission');
    }

    if (appt.status !== AppointmentStatus.CONFIRMED) {
      throw new BadRequestException('Only confirmed appointments can be completed');
    }

    appt.status = AppointmentStatus.COMPLETED;
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
}