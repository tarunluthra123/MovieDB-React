import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState('')
    const [token,setToken] = useState('')
    
    return (
        <UserContext.Provider value={[currentUser,setCurrentUser,token,setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}