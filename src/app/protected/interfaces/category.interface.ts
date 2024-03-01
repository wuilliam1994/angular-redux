import { Data, IResponse } from "./response.interface";

export interface ICategory extends IResponse<Data<Category>> {}

export interface Category {
    _id: string;
    house: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
