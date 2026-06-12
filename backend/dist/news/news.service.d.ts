import { Repository } from 'typeorm';
import { News } from './news.entity';
import { Doctor } from '../doctors/doctors.entity';
export declare class NewsService {
    private repo;
    private doctorRepo;
    constructor(repo: Repository<News>, doctorRepo: Repository<Doctor>);
    create(userId: number, data: any): Promise<News[]>;
    findAll(): Promise<News[]>;
}
