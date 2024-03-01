import { Data, IResponse } from "./response.interface";

export interface IWorker extends IResponse<Worker> {}

export interface Worker {
    _id:       string;
    user:      string;
    house:     string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

