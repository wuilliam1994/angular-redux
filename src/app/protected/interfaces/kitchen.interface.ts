export interface IKitchen {
    status:  number;
    message: string;
    data:    Kitchen;
}

export interface Kitchen {
    pending: Pending[];
}

export interface Pending {
    account: Account;
}

export interface Account {
    _id:     string;
    table:   Table;
    product: Product[];
}

export interface Product {
    menuProduct:    MenuProduct;
    cantProduct:    number;
    balanceProduct: number;
    ready:          boolean;
    createdAt:      Date;
    updatedAt:      Date;
}

export interface MenuProduct {
    _id:     string;
    product: string;
}

export interface Table {
    _id:    string;
    number: number;
}