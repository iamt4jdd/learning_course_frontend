import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";


// This context is used to manage the authentication state of the user
export const AuthContext = createContext({
  token: "",
  refreshToken: "",
  isAuthenticated: false,
  customerId: "",
  authenticate: async (token, refreshToken) => {},
  logout: () => {},
});

// This component is used to provide the authentication context to the application
const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add this line

  // useEffect(() => {
  //   const initializeAuthState = async () => {
  //     const storedToken = await AsyncStorage.getItem("token");
  //     const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
  //     if (storedToken) {
  //       console.log(
  //         "Initializing state from AsyncStorage:",
  //         storedToken,
  //         storedRefreshToken
  //       );
  //       setToken(storedToken);
  //       setRefreshToken(storedRefreshToken);
  //     }
  //   };
  //   initializeAuthState();
  // }, []);

  async function authenticate(token, refreshToken) {
    if (token && refreshToken) {
      setToken(token);
      setRefreshToken(refreshToken);
      try {
        setIsLoading(true);

        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        console.log("Tokens stored successfully");
      } catch (error) {
        console.log("Couldn't set token to AsyncStorage store: ", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Token or refreshToken is null or undefined");
    }
  }
  const logout = async () => {
    setToken("");
    setRefreshToken("");
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refreshToken");
    } catch (error) {
      console.log("Couldn't remove token from local storage: ", error);
    }
  };

  const values = {
    token,
    refreshToken,
    isAuthenticated: !!token,
    logout,
    authenticate,
    customerId: token ? jwtDecode(token).customerId : "",
    isLoading, // Add this line
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
