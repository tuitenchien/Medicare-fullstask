import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Appointment } from '../appointment/appointment.entity';
import { Doctor } from '../doctors/doctors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Appointment,Doctor])],
  providers: [UsersService],
  exports: [UsersService],
  controllers:[UsersController]
})
export class UsersModule {}