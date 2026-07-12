import { useEffect, useState } from "react";
import { AuthContext } from "./authContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (
      storedUser &&
      storedUser !== "undefined" &&
      storedUser !== "null"
    ) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error("Invalid user data in localStorage");

        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);

    if (userData) {
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
