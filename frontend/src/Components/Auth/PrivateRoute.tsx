import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { IAuthProvider } from '../../Contexts/AuthProvider/types';
import { useAuth } from '../../Contexts/AuthProvider/useAuth';

const PrivateRoute = ({ children }: IAuthProvider) => {
    const auth = useAuth();
    const navigate = useNavigate();

    if(!auth?.user?.username) {
        return (
          <section className="auth">
            <img src="https://cdn.discordapp.com/attachments/938669134890278937/1043598998990229555/20221119_154918_0002.png" alt="Forbidden" className="logoLogin"></img>
            <button type="button" onClick={() => navigate("/")}>
              Back to Login
            </button>
            <br />
            <button type="button" onClick={() => navigate("/register")}>
              Register
            </button>
          </section>
        );
    }
   
    return children
}

export default PrivateRoute;