import { HttpErrorResponse } from "@angular/common/http";
import { ROLES } from "../enums/roles.enum";

export interface IAuthority {
    authority: string;
}

export interface IRegisterPayload {
    id: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
    fullName: string;
    email: string;
    role: string;
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: IAuthority[];
    username: string;
    active: boolean;
    deleted: boolean;
}

export interface IRegisterResponse extends IApiResponse<IRegisterPayload> { }

export interface ILoginPayload {
    id: number,
    fullName: string,
    email: string,
    role: ROLES,
    isActive: boolean,
    isDeleted: boolean,
    token: string
}

export interface ILoginResponse extends IApiResponse<ILoginPayload> { }

export interface IDashboardPayload {
    dummyStr: string;
}

export interface IDashboardResponse extends IApiResponse<IDashboardPayload> { }

export interface IForgotPasswordPayload {
    passwordResetUrl: string;
}

export interface IForgotPasswordResponse extends IApiResponse<IForgotPasswordPayload> { }

export interface IResetPasswordPayload {
    email: string;
    passwordReset: boolean;
}

export interface IResetPasswordResponse extends IApiResponse<IResetPasswordPayload> { }

export interface IApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export interface IApiError {
    timeStamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
    validationErrors?: Record<string, string>;
}

export interface IError extends HttpErrorResponse {
    error: IApiError
}