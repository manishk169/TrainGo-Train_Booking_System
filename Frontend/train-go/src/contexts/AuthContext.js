  import { createContext, useEffect, useState } from "react";

  export const AuthContext = createContext()

  export function AuthProvider(props)
  {
    // let [isLogin, setIsLogin] = useState(true)
    // let [user, setUser] = useState(null)


    const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") === "true"; // stored as string
  });

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  // Whenever isLogin changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  // Whenever user data changes, save/remove it from localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

    return(
      <AuthContext.Provider value={{isLogin, setIsLogin, user, setUser}}>
        {props.children}
      </AuthContext.Provider>
    ) 
  }