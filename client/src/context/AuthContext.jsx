import React, {createContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export function AuthContextProvider({children}) {
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("access") ?? null);
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refresh") ?? null);
    const [user, setUser] = useState(() => localStorage.getItem('access')
        ? jwtDecode(localStorage.getItem('access')) : null);
    let [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    async function loginUser(username, password) {
        return fetch('http://127.0.0.1:8000/api/v1/auth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });
    }

    async function registerUser(username, email, password) {
        return fetch('http://127.0.0.1:8000/api/v1/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        });

    }

    function logoutUser() {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/');
    }

    async function refreshTokens() {
        let response = await fetch('http://127.0.0.1:8000/api/v1/auth/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"refresh": refreshToken})
        });
        let data = await response.json();
        if (response.status === 200) {
            setTokens(data.access, data.refresh);
        } else {
            console.log("Refresh token not valid");
            logoutUser();
        }
    }

    function setTokens(access, refresh) {
        setAccessToken(access);
        setRefreshToken(refresh);
        setUser(jwtDecode(access));
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
    }

    useEffect(() => {

        if (accessToken) {
            if (loading) {
                refreshTokens().then(() => setLoading(false));
            }

            let updateTime = 1000 * 60 * 90;

            let interval = setInterval(() => {
                if (accessToken && refreshToken) {
                    refreshTokens();
                }
            }, updateTime);

            return () => clearInterval(interval);
        } else {
            setLoading(false);
        }

    }, [accessToken, refreshToken, loading]);

    let contextData = {
        user: user,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser,
        accessToken: accessToken,
        setTokens: setTokens,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}