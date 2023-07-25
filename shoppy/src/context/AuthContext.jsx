import { createContext, useContext, useState, useEffect } from 'react';
import { onUserStateChange } from '../api/firebase';
import { login, logout } from '../api/firebase';
const AuthContext = createContext();

export function AuthContextProvieder({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => setUser(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
