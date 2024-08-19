import React from 'react';
import useAuth from '../../hooks/useAuth';

const Profile = () => {

    const { auth } = useAuth();

    return (
        <div className='profile'>
            <h2>{auth.user}</h2>
            <p>Head Roaster</p>  
        </div>
    )
}

export default Profile;