import React from 'react';
import { useAuth } from '../../Contexts/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';
import Transaction from '../../Components/Transaction';
import ViewTransactions from '../../Components/ViewTransactions';

const Home: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { balance, user } = auth;

    function logout() {
        auth.logout();
        navigate("/");
    }

    return (
        <section className="homeView">  
            <header className="headerView">
                <h1>Home</h1>
                <button
                type="button"
                onClick={logout}
                >
                    Logout
                </button>   
            </header>
            <section className="userView">
                <h2>Welcome { user?.username } to NG_CASH</h2>
                <h2>Your balance is $: { balance?.balance },00</h2>
            </section>
            <section className="transactionsView">
                <Transaction />
                <ViewTransactions />
            </section>
        </section>
    );
};

export default Home;