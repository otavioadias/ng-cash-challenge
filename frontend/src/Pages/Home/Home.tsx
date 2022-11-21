import React from 'react';
import './index.css';
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
        <section className="home">
        <header className="headerView">
            <img src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt="Logo NG.CASH" className="logo is-hidden-touch"></img>
            <button
            type="button"
            onClick={logout}
            >
                Logout
            </button>   
        </header>
        <section className="homeView">  
            <section className="userView">
                <h2>Welcome { user?.username }</h2>
                <h2>Your balance is $: { balance?.balance },00</h2>
            </section>
            <section className="transactionsView">
                <Transaction />
                <ViewTransactions />
            </section>
        </section>
        </section>  
    );
};

export default Home;