import React, { useState, createContext } from 'react';

export const LockerContext = createContext({});

export function LockerContextProvider({ children }) {
    const [locker, setLocker] = useState(null);

    return (
        <LockerContext.Provider value={{ locker, setLocker }}>
            {children}
        </LockerContext.Provider>
    );
}
