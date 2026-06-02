export interface IRegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IForgotPasswordRequest {
    email: string;
}

export interface IResetPasswordRequest {
    email: string;
    password: string;
    token: string;
}