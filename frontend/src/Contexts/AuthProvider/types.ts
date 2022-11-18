export interface IUser {
    username?: string;
    password?: string;
    token?: string;
    signed?: boolean;
}

export interface IBalance {
    id?: number;
    balance?: number;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    registration: (email: string, password: string) => Promise<void>;
    getBalance(): Promise<IBalance | void>;
    logout: () => void;
    balance: IBalance | undefined;
    user: IUser | null | undefined;
}

export interface IAuthProvider {
    children?: any;
}