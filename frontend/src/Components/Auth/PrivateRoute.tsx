import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IAuthProvider } from '../../Contexts/AuthProvider/types';
import { useAuth } from '../../Contexts/AuthProvider/useAuth';

const PrivateRoute = ({ children }: IAuthProvider) => {
    const auth = useAuth();
    const navigate = useNavigate();

    if(!auth?.user?.username) {
        return (
          <section>
            <h1>You don't have access</h1>
            <button type="button" onClick={() => navigate("/")}>
              Login
            </button>
          </section>
        );
    }
   
    return children
}

export default PrivateRoute;