import { Data, IResponse } from "./response.interface";

export interface ITable extends IResponse<Data<Table>> {}

export interface Table {
    _id: string;
    house: string;
    number: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}