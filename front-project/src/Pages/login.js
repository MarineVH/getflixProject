import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // Effect to check for a valid token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // Token exists, navigate to home or the appropriate authenticated route
            navigate('/home');
        }
    }, [navigate]);
    // Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8888/getflixProject/api/login.php', {
                username: username,
                password: password,
            });
            if (response.data && response.data.message === 'Connexion réussie') {
                const { token, username, role } = response.data;
                // Store the token and user information in local storage
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('role', role);
                // Set the token in state for future use
                setToken(token);
                navigate('/home');
            }
            else {
                console.error('Login failed:', response.data.error);
            }
        }
        catch (error) {
            console.error('Login error:', error);
        }
    };
    // Function to handle logout
    const handleLogout = () => {
        // Clear the token and user information from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        // Remove the token from state
        setToken('');
        // Navigate to the login page or another appropriate route
        navigate('/login');
    };
    return (_jsx("div", { className: "overflow-hidden", children: _jsxs("div", { className: 'signup_body template d-flex justify-content-center align-items-center vh-100', children: [_jsx("div", { className: 'col-md-6 col-12 d-flex flex-column h-100', children: _jsx("div", { className: 'signup_card p-5 flex-fill', children: _jsxs("form", { className: 'h-100 d-flex flex-column justify-content-center', onSubmit: handleLogin, children: [_jsx("h3", { className: 'text-center', children: "Log In" }), _jsxs("div", { className: 'mb-2', children: [_jsx("label", { htmlFor: 'username', children: "Username" }), _jsx("input", { type: 'text', placeholder: 'Enter username', className: 'form-control', value: username, onChange: (e) => setUsername(e.target.value) })] }), _jsxs("div", { className: 'mb-2', children: [_jsx("label", { htmlFor: 'password', children: "Password" }), _jsx("input", { type: 'password', placeholder: 'Enter password', className: 'form-control', value: password, onChange: (e) => setPassword(e.target.value) })] }), _jsx("div", { className: 'mt-2 mb-2', children: _jsx("button", { type: 'submit', className: 'btn', children: "Log in" }) }), _jsx("div", { children: _jsxs("p", { className: 'text-end mt-2', children: ["Forgot ", _jsx(Link, { className: 'link_login', to: '/forgot-password', children: "Password?" })] }) }), _jsx("div", { children: _jsxs("p", { children: [" If you don't have a account you can", _jsx("a", { href: 'signup', className: 'link_login ms-2', children: "Register here" })] }) })] }) }) }), token && (_jsxs("div", { children: [_jsxs("p", { children: ["Welcome, ", localStorage.getItem('username'), "!"] }), _jsx("button", { onClick: handleLogout, children: "Logout" })] }))] }) }));
}
export default Login;
