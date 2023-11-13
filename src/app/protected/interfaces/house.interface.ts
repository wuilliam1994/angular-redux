import { Data, IResponse } from "./response.interface";

export interface IHouse extends IResponse<Data<House>> {}

export interface House {
    _id: string;
    user: string;
    name: string;
    cantTables: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}