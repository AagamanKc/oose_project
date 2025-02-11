import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem("REFRESH_TOKEN");
        try {
        // api.post automatically handle baseURL from api.js that uses axios
            const res = await api.post("/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem("ACCESS_TOKEN", res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };
// auth check if we have access_token and check if it is expired or not if its present
//if expired, then referesh
// if not present then go to login
    const auth = async () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
        console.log("No token found, redirecting to login...");
        setIsAuthorized(false);
        return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
        console.log("Token expired, attempting refresh...");
        await refreshToken();
    } else {
        console.log("Token valid, granting access...");
        setIsAuthorized(true);
    }
};

// async function for handling
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // return isAuthorized ? children : <Navigate to="/login" />;
    if (isAuthorized) {
        return children;
      } else {
        return <Navigate to="/login" />;
      }
}

export default ProtectedRoute;