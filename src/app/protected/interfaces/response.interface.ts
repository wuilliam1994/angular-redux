export interface IResponse<T> {
    status: number;
    message: string;
    data: T;
    info: Info;
}

export interface Data<T> {
    [key: string]: T[];
}

export interface Info {
    page: number;
    limit: number;
    filter: string;
    nextPage: null;
    skip: number;
    range: number;
    total: number;
}