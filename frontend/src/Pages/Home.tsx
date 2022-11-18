import React from 'react';
import { useAuth } from '../Contexts/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { balance, user } = auth;

    function logout() {
        auth.logout();
        navigate("/");
    }

    return (
        <section>  
            <h1>Home</h1>
            <h2>Welcome { user?.username } to NG_CASH</h2>
            <h2>Your balance is { balance?.balance }</h2>
            <button
              type="button"
              onClick={logout}
            >
                Logout
            </button>
        </section>
    );
};

export default Home;