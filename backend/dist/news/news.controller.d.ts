import { NewsService } from './news.service';
export declare class NewsController {
    private service;
    constructor(service: NewsService);
    create(req: any, body: any): Promise<import("./news.entity").News[]>;
    findAll(): Promise<import("./news.entity").News[]>;
}
