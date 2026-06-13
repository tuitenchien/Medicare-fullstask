import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { PatientsService } from '../patients/patients.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private patientsService;
    private jwtService;
    constructor(usersService: UsersService, patientsService: PatientsService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            cccd: string;
            role: string;
        };
    }>;
}
