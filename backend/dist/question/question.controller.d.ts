import { QuestionsService } from './question.service';
export declare class QuestionsController {
    private service;
    constructor(service: QuestionsService);
    ask(req: any, body: any): Promise<import("./question.entity").Question>;
    answer(id: string, req: any, body: any): Promise<import("./question.entity").Question>;
    findAll(): Promise<import("./question.entity").Question[]>;
}
