import React from 'react';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const {logOut} = useAuth()
    return (
        <div>
            homeeeeeeeeeeeeeee
        </div>
    );
};

export default Home;