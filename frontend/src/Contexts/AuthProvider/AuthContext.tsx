import { createContext, useEffect, useState } from 'react';
import { requestData, requestLogin, requestRegistration } from '../../Services/request';
import { IAuthProvider, IBalance, IContext, IUser } from './types';
import { getUserLocalStorage, setBalanceLocalStorage, setUserLocalStorage } from './utils';

const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();
    const [balance, setBalance] = useState<IBalance | null>();

    useEffect(() => {
        const user = getUserLocalStorage();
        const balance = getUserLocalStorage();
        if(user) {
            setUser(user);
            setBalance(balance);
        }
    }, []);

    async function authenticate (username: string, password: string) {
        const response = await requestLogin('login', { username, password });
        if(response !== null) {
            const payload = { token: response.token, username }
            setUser(payload);
            setUserLocalStorage(payload);
        }
    }

    async function registration(username: string, password: string) {
        const response = await requestRegistration('registration', {username, password});
        if(response !== null) {
            const payload = { token: response.token, username }
            setUser(payload);
            setUserLocalStorage(payload);
        }
    }

    async function getBalance(): Promise<IBalance | void> {
        const response = await requestData('account');
        if(response !== null) {
            const payload = { token: response.token, id: response.id };
            setBalance(payload);
            setBalanceLocalStorage(payload);
        }
        return response;
    }

    function logout () {
        setUser(null);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{ signed: true, ...user, ...balance, authenticate, registration, getBalance, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;