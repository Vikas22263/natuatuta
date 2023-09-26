import { useState, useContext, useEffect, createContext } from "react";


const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
   
  });
  //default axios

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.data.user,
      
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
//

//custom hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
