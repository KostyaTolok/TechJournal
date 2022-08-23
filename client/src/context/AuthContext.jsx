import React, {createContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const AuthContext = createContext();

export default AuthContext;

export function AuthContextProvider({children}) {
    const [cookies, setCookie, removeCookies] = useCookies(['access', 'refresh']);
    const [accessToken, setAccessToken] = useState(() => cookies.access ?? null);
    const [refreshToken, setRefreshToken] = useState(() => cookies.refresh ?? null);
    const [user, setUser] = useState(() => cookies.access ? jwtDecode(cookies.access) : null);
    let [loading, setLoading] = useState(true);
    const url = "http://localhost:8000/api/v1/auth";

    const navigate = useNavigate();

    async function loginUser(username, password) {
        return fetch(`${url}/token/`, {
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
        return fetch(`${url}/register/`, {
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
        removeCookies('access');
        removeCookies('refresh');
        navigate('/');
    }

    async function refreshTokens() {
        let response = await fetch(`${url}/token/refresh/`, {
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
        if (cookies.access) {
            removeCookies('access');
        }
        if (cookies.refresh) {
            removeCookies('refresh');
        }
        setCookie('access', access, {expires: new Date(jwtDecode(access).exp * 1000), sameSite: true});
        setCookie('refresh', refresh, {expires: new Date(jwtDecode(refresh).exp * 1000), sameSite: true});
    }

    async function getUserProfile() {
        return await fetch(`${url}/profile/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
    }

    async function changeUserProfile(data) {
        return await fetch(`${url}/profile/`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: data
        });
    }

    useEffect(() => {

        if (accessToken) {
            if (loading) {
                refreshTokens().then(() => setLoading(false));
            }

            let updateTime = 1000 * 60 * 14;

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
        getUserProfile: getUserProfile,
        changeUserProfile: changeUserProfile,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}