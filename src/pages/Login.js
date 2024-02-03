

import React, { useState } from 'react';
import Input from '../components/common/Input.js';
import Button from '../components/common/Button.js';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const BaseUrl = 'http://localhost:5000/api/v1';
    const navigate = useNavigate();

    const initialValue = {
        Email: '',
        Password: '',
    };

    const [userInfo, setUserinfo] = useState(initialValue);

    const onhandleChange = (e) => {
        setUserinfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const DataPost = {
        email: userInfo.Email,
        password: userInfo.Password,
    };

    const postedData = async () => {
        try {
            const requestOption = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(DataPost),
            };

            const response = await fetch(`${BaseUrl}/login`, requestOption);

            if (!response.ok) {
                throw new Error(`HTTP ERROR ${response.status}`);
            }

            const data = await response.json();
            const { token } = data;

            if (token) {
                localStorage.setItem('token', token);
                console.log('Token stored successfully');
                navigate('/product');
            } else {
                console.error('Token not found in the response');
            }
        } catch (error) {
            console.error('Error in POST request:', error.message);
        }
    };

    const submitData = (e) => {
        e.preventDefault();
        postedData();
    };

    return (
        <div className="full">
            <div className="form">
                <h1>Login</h1>
                <form onSubmit={submitData}>
                    <Input
                        type="email"
                        value={userInfo.Email}
                        name="Email"
                        onChange={onhandleChange}
                        placeholder="Email"
                        required={true}
                        className="text"
                    />
                    <Input
                        type="password"
                        value={userInfo.Password}
                        name="Password"
                        onChange={onhandleChange}
                        placeholder="Password"
                        required={true}
                        className="text"
                    />
                    <button type='submit' className="btn">Login</button>
                </form>
                <p className="para">Don't have an account</p>
                <Button to="/" className="btn1" text="Sign Up" />
                <Link to="/sendMail">
                    <p className="para">Forgot password</p>
                </Link>
            </div>
        </div>
    );
}

export default Login;
