import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./users.entity").User[]>;
    findById(id: number): Promise<import("./users.entity").User>;
    findByCccd(cccd: string): Promise<import("./users.entity").User | null>;
    remove(id: number): Promise<import("./users.entity").User>;
}
