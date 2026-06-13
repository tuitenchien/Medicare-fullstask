import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Doctor } from '../doctors/doctors.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,

    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

  ) { }

  create(user: Partial<User>) {
    return this.userRepo.save(user);
  }

  async findByCccdForLogin(cccd: string) {
    return await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.cccd = :cccd', { cccd })
      .getOne();
  };
  async findByCccd(cccd: string) {
    return await this.userRepo.findOne({
      where: { cccd },
    });
  }
  async findAll() {
    return await this.userRepo.find();
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async removeDoctor(doctorId: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { id: doctorId },
      relations: { user: true },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const count = await this.appointmentRepo.count({
      where: {
        doctor: { id: doctorId },
      },
    });

    if (count > 0) {
      throw new BadRequestException(
        `Không thể xóa bác sĩ vì còn ${count} lịch hẹn`
      );
    }

    await this.doctorRepo.remove(doctor);

    return {
      message: 'Đã xóa bác sĩ thành công',
    };
  }
}