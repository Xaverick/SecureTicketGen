import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

export const Context = createContext();

const AppContext = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    const [loggedin, setLoggedin] = useState(false)
    const [ticket_id, setTicketid] = useState("");

    const updateUser = (userData) => {
        setUserInfo(userData);
    };
    const location = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Context.Provider
            value={{   
                userInfo,
                setUserInfo,
                ticket_id,
                setTicketid,
                loggedin,
                setLoggedin,
                updateUser
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;
