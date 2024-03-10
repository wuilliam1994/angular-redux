export interface IAccount {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    account: Account;
}

export interface Account {
    id:      string;
    table:   Table;
    balance: number;
    inUse:   boolean;
}

export interface Table {
    _id:    string;
    number: number;
}
