import { HttpErrorResponse } from "@angular/common/http";
import { ROLES } from "../enums/roles.enum";

export interface IAuthority {
    authority: string;
}

export interface IRegisterResponse {
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

export interface ILoginResponse {
    id: number,
    fullName: string,
    email: string,
    role: ROLES,
    isActive: boolean,
    isDeleted: boolean,
    token: string
}

export interface IApiError {
    timeStamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
    validationErrors?: Record<string, string>;
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