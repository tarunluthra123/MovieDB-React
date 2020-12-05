import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState('')
    
    return (
        <UserContext.Provider value={[currentUser,setCurrentUser]}>
            {props.children}
        </UserContext.Provider>
    )
}