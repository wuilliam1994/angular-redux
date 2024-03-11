export interface IUser {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    worker: User[];
}

export interface User {
    id:        string;
    username:  string;
    role:      string[];
    password:  string;
    email:     string;
    createdAt: Date;
    updatedAt: Date;
}


// export interface User {
//     id: string;
//     displayName: string;
//     loading?: boolean;
//     error?: string;
// }