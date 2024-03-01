export interface User {
    id:        string;
    username:  string;
    role:      string[];
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