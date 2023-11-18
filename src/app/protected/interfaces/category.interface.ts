import { Data, IResponse } from "./response.interface";

export interface IHouse extends IResponse<Data<CategoryInterface>> {}

export interface CategoryInterface {
    _id: string;
    house: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
