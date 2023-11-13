import { User } from "./user.interface";

export interface AuthResponce {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    user:  User;
    token: string;
}


