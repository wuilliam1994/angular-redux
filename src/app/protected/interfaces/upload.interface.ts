export interface IUpload {
    status:  number;
    message: string;
    data:    Upload;
}

export interface Upload {
    name: string;
}