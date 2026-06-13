import {
    Controller,
    Get,
    Delete,
    Param,
    Query,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
    @Get('filter/:id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findById(id);
    }
    @Get('search')
    findByCccd(@Query('cccd') cccd: string) {
        return this.usersService.findByCccd(cccd);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.removeDoctor(id);
    }
}