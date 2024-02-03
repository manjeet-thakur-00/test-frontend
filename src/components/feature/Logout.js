

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:5000/api/v1';

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        try {
            const response = await fetch(`${baseUrl}/logout`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                localStorage.removeItem('token');
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className='text-align-center'>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
