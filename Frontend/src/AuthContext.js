import { createContext, useState } from "react";

const AuthContext = createContext({
  isLogedIn: false,
  hello: "hhh",
  login: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const login = (value) => {
    setIsLogedIn(value);
  };

  const hello = (value) => {
    setIsLogedIn(value);
  };

  return (
    <AuthContext.Provider
      value={{ isLogedIn: isLogedIn, login: login, hello: hello }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
