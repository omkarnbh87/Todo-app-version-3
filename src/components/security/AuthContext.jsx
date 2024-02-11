/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
//1:Create the context

import { createContext, useContext, useState } from "react";
import { ExecuteBasicAuthenticationService } from "../api/HelloWorldApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2:Share the created context to other components

export default function AuthProvider({ children }) {
  //Put some state in the context

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  // function login(username, password) {
  //   if (username === "Omkarnbh87" && password === "dummy") {
  //     setAuthenticated(true);
  //     setUsername(username);
  //     return true;
  //   } else {
  //     setAuthenticated(false);
  //     setUsername(null);
  //     return false;
  //   }
  // }
  async function login(username, password) {
    const baToken = "Basic " + window.btoa(username + ":" + password);

    const response = await ExecuteBasicAuthenticationService(baToken);
    try {
      if (response.status === 200) {
        setToken(baToken);
        setAuthenticated(true);
        setUsername(username);
        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers.Authorization = baToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }
  function logout() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        login,
        logout,
        username,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
