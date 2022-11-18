import axios, { AxiosRequestConfig } from 'axios';
import { getUserLocalStorage } from '../Contexts/AuthProvider/utils';

const api = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token: string) => {
    api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint: string) => {
    const { data } = await api.get(endpoint);
    return data;
};

type IToken = {
    token: string,
}
export const requestLogin = async (endpoint: string, body: any): Promise<IToken | null> => {
    const { data } = await api.post(endpoint, body);
    return data;
}

export const requestRegistration = async (endpoint: string, body: any): Promise<IToken | null> => {
    const { data } = await api.post(endpoint, body);
    return data;
}

export type ITransferUser = {
    id: number,
    debitedAccountId: number,
    creditedAccountId: number,
    value: number,
    createdAt: string,
}
export const requestTransaction = async (endpoint: string, body: any): Promise<ITransferUser | null> => {
    const { data } = await api.put(endpoint, body);
    return data;
}

api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const user = getUserLocalStorage();
        if(config.headers)
            config.headers.Authorization = user?.token;
            return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)