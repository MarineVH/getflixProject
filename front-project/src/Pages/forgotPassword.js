import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import './reset_forgot.css';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleForgotPassword = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:8888/getflixProject/api/forgot_password.php', {
                email: email,
            });
            if (response.data.success) {
                setMessage('Password reset instructions sent to your email.');
            }
            else {
                setMessage('Please check your email. If you did not receive email, try again.');
            }
        }
        catch (error) {
            console.error('Error initiating password reset:', error);
            setMessage('An error occurred. Please try again later.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "overflow-hidden", children: _jsxs("div", { className: 'template d-flex justify-content-center align-items-center vh-100', children: [_jsx("div", { className: 'col-md-6 col-12 d-flex flex-column h-100', children: _jsx("div", { className: 'forgot_card p-5 flex-fill', children: _jsxs("form", { className: 'h-100 d-flex flex-column justify-content-center', children: [_jsx("h3", { className: 'text-center mb-4', children: "Forgot password" }), _jsx("p", { className: 'mb-4', children: "Enter your email address to receive instructions for resetting your password." }), _jsxs("div", { className: 'mb-4', children: [_jsx("label", { htmlFor: 'email', children: "Email: " }), _jsx("input", { type: "email", placeholder: 'Enter your email', className: 'form-control', value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsx("button", { className: 'btn mb-3', onClick: handleForgotPassword, disabled: isLoading, children: isLoading ? 'Resetting Password...' : 'Reset Password' }), _jsx("p", { "aria-live": "polite", children: message })] }) }) }), _jsx("div", { className: 'col-md-6 d-none d-md-flex align-items-center h-100', children: _jsx("img", { src: 'assets/forgot.svg', alt: 'Description', className: 'img-fluid' }) })] }) }));
};
export default ForgotPassword;
