export interface IUser {
    username?: string;
    password?: string;
    token?: string;
    signed?: boolean;
}

export interface IBalance {
    id?: number;
    balance?: string;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    registration: (email: string, password: string) => Promise<void>;
    getBalance(): Promise<IBalance | void>;

    logout: () => void;
}

export interface IAuthProvider {
    children?: React.ReactNode | React.ReactNode[];
}