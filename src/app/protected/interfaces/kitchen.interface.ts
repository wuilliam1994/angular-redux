import { Data, IResponse } from "./response.interface";

export interface IKitchen extends IResponse<Data<Kitchen>> {}

export interface Kitchen {
    pending: Pending[];
}

export interface Pending {
    _id:            string;
    account:        Account;
    menuProduct:    MenuProduct;
    cantProduct:    number;
    balanceProduct: number;
    ready:          boolean;
    createdAt:      Date;
    updatedAt:      Date;
}

export interface Account {
    _id:   string;
    table: Table;
}

export interface Table {
    _id:    string;
    number: number;
}

export interface MenuProduct {
    _id:     string;
    product: string;
}