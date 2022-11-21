import { IBalance, IUser } from "./types";

export function setUserLocalStorage (user: IUser | null) {
    localStorage.setItem('user', JSON.stringify(user));
};

export function getUserLocalStorage () {
    const json = localStorage.getItem('user');
    if(!json) return null;
    const user = JSON.parse(json);
    return user ?? null;
};

export function setBalanceLocalStorage (balance: IBalance | null) {
    localStorage.setItem('balance', JSON.stringify(balance));
};

export function getBalanceLocalStorage () {
    const json = localStorage.getItem('balance');
    if(!json) return null;
    const balance = JSON.parse(json);
    return balance ?? null;
};