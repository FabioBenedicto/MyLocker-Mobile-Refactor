import React, { createContext, useEffect, useState } from 'react';
import api from '../services/api';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({
        ra: '',
        first_name: '',
        last_name: '',
        email: '',
    });
    const [cookieLoaded, setCookieLoaded] = useState(false);

    useEffect(() => {
        api
            .get('/validate/students', { withCredentials: true })
            .then((response) => {
                setUser({ ...response.data });
            })
            .catch((err) => {
                console.log(err.response.data);
            })
            .finally(() => {
                setCookieLoaded(true);
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, cookieLoaded }}>
            {children}
        </UserContext.Provider>
    );
}
