export interface IWorker {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    worker: Worker[];
}

export interface Worker {
    _id:       string;
    user:      User;
    house:     House;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface House {
    _id:  string;
    name: string;
}

export interface User {
    _id:      string;
    username: string;
    email:    string;
}

