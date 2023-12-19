import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import "./username.css";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
function AccessData() {
    const { username: routeUsername } = useParams();
    const storedUsername = localStorage.getItem('username');
    const username = storedUsername || routeUsername || null;
    const [newUsername, setUsername] = useState("");
    const [newEmail, setEmail] = useState("");
    const [newPassword, setPassword] = useState("");
    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newUsername || newEmail || newPassword) {
            try {
                const response = await axios.post(`http://localhost:8888/getflixProject/api/update_profile.php?username=${username}`, {
                    username: routeUsername,
                    newUsername,
                    newEmail,
                    newPassword
                });
                if (response.data.success) {
                    if (newUsername) {
                        localStorage.setItem("username", newUsername);
                        window.location.assign(`/update-data/${newUsername}`);
                    }
                    else {
                        window.location.assign(`/update-data/${username}`);
                    }
                    alert("Data has been saved.");
                }
                else {
                    alert('Failed to update profile.');
                }
            }
            catch (error) {
                console.error('Error updating profile:', error);
            }
        }
        else {
            alert('Please fill out at least one fields.');
        }
    };
    return (_jsxs("div", { className: "user d-flex justify-content-center align-items-center vh-100", children: [_jsx("div", { className: "overlay position-absolute" }), _jsxs("div", { className: "form-user text-center", children: [_jsx("h2", { className: "fw-bold pol", children: "Choose you new Username" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("label", { className: "m-4", style: { color: "#0071b8" }, htmlFor: "", children: _jsx("h3", { children: "Username:" }) }), _jsx("br", {}), _jsx("input", { className: "mb-3 border-0 border-bottom border-black w-50", type: "text", value: newUsername, onChange: (e) => setUsername(e.target.value) }), _jsx("br", {}), _jsx("h2", { className: "fw-bold pol", children: "Choose your new Email" }), _jsx("label", { className: "m-4", style: { color: "#0071b8" }, htmlFor: "", children: _jsx("h3", { children: "Email:" }) }), _jsx("br", {}), _jsx("input", { className: "mb-3 border-0 border-bottom border-black w-50", type: "email", value: newEmail, onChange: (e) => setEmail(e.target.value) }), _jsx("br", {}), _jsx("h2", { className: "fw-bold pol", children: "Choose your new Password" }), _jsx("label", { className: "m-4", style: { color: "#0071b8" }, htmlFor: "", children: _jsx("h3", { children: "Password:" }) }), _jsx("br", {}), _jsx("input", { className: "mb-3 border-0 border-bottom border-black w-50", type: "password", value: newPassword, onChange: (e) => setPassword(e.target.value) }), _jsx("br", {}), _jsx("button", { className: "continue-button border-1 border-black", type: "submit", children: "save" }), _jsxs(Link, { className: "  fs-6  text-decoration-none", style: { color: '#0071b8' }, to: "/home", children: [" ", "Home page"] }), " |", _jsxs(Link, { className: "  fs-6  text-decoration-none", style: { color: '#0071b8' }, to: "/profile", children: [" ", "Profile page"] })] })] })] }));
}
export default AccessData;
