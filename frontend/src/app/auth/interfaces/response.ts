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
