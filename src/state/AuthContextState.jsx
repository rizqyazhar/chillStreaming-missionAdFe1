const apiUrl = import.meta.env.VITE_API_URL;
import { createContext, useState } from "react";
import useFetch from "../customHooks/useFetch";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoginPage, setIsLoginPage] = useState(null);
  const { users, error, loading } = useFetch(apiUrl);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInput.username);
    console.log(userInput.password);
    setUserInput({
      username: "",
      password: "",
    });
  };

  if (loading) {
    return (
      <>
        <div
          style={{ backgroundImage: `url('/img/bg-img/bg-login.jpg')` }}
          className='inset-0 min-h-screen bg-cover bg-center flex justify-center items-center'></div>
        <div className='absolute inset-0 bg-black/30'></div>
      </>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoginPage,
        setIsLoginPage,
        users,
        userInput,
        handleChange,
        handleSubmit,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
