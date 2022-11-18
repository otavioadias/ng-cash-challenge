import React from 'react';
import { useAuth } from '../Contexts/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    function logout() {
        auth.logout();
        navigate("/");
    }

    return (
        <>
            <h1>Home</h1>
            <>Welcome { auth.username } to NG_CASH { auth.getBalance }</>
            <>Your balance { auth.getBalance() }</>
            <button
              type="button"
              onClick={logout}
            >
                Logout
            </button>
        </>
    );
};

export default Home;