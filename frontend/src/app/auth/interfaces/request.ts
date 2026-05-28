export interface IRegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}