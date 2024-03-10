export interface IFoodMenu {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    menu: Menu[];
}

export interface Menu {
    category: Category;
}

export interface Category {
    _id:     string;
    name:    string;
    product: Product[];
}

export interface Product {
    _id:       string;
    product:   string;
    price:     number;
    photo:     string;
    cantidad:  number;
    createdAt: Date;
    updatedAt: Date;
}