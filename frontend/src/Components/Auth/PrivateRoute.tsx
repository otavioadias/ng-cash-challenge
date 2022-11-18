import React from 'react';
import { IAuthProvider } from '../../Contexts/AuthProvider/types';
import { useAuth } from '../../Contexts/AuthProvider/useAuth';

const PrivateRoute = ({ children }: IAuthProvider) => {
    const auth = useAuth();

    if(!auth.username) {
        return <h1>You don't have access</h1>
    }
   
    return children
}

export default PrivateRoute;