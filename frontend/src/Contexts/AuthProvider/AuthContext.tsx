import { createContext, useEffect, useState } from 'react';
import { requestData, requestLogin, requestRegistration } from '../../Services/request';
import { IAuthProvider, IBalance, IContext, IUser } from './types';
import { getBalanceLocalStorage, getUserLocalStorage, setBalanceLocalStorage, setUserLocalStorage } from './utils';

const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();
    const [balance, setBalance] = useState<IBalance>();

    useEffect(() => {
        const user = getUserLocalStorage();
        const balance = getBalanceLocalStorage();
        getBalance();
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
        const response: IBalance = await requestData('account');
        if(response !== null) {
            const payload = { id: response.id, balance: response.balance };
            setBalance(payload);
            setBalanceLocalStorage(payload);
        }
    }

    function logout () {
        setUser(null);
        setUserLocalStorage(null);
        setBalanceLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{ signed: true, user, balance, authenticate, registration, getBalance, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;