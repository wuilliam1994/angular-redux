import { Data, IResponse } from "./response.interface";

export interface IMenu extends IResponse<Data<Menu>> {}

export interface Menu {
    _id: string;
    house: string;
    category: string;
    product: string;
    price: number;
    photo: string;
    cantidad: number;
    extencion: string
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
