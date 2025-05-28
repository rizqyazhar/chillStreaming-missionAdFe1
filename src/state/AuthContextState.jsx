const apiUrl = import.meta.env.VITE_API_URL;
import { createContext, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postUsers } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(null);
  const { users, error, loading } = useFetch(apiUrl);
  const [userInput, setUserInput] = useState({
    login: {
      username: "",
      password: "",
    },
    register: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const usernameMatch = users.find(
    (user) => user.username === userInput.login.username
  );
  const passwordMatch = users.find(
    (user) => user.password === userInput.login.password
  );

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      login: { ...prev.login, [name]: value },
    }));
  };
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      register: { ...prev.register, [name]: value },
    }));
  };

  const [messageAfterLogin, setMessageAfterLogin] = useState(null);
  const [message, setMessage] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (usernameMatch && passwordMatch) {
      setMessage(true);
      setMessageAfterLogin(true);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } else {
      setMessage(true);
      setMessageAfterLogin(false);
      setTimeout(() => {
        setMessage(false);
      }, 1500);
      console.log("username dan password anda salah");
    }
    setUserInput((prev) => ({
      ...prev,
      login: {
        username: "",
        password: "",
      },
    }));
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (userInput.register.password !== userInput.register.confirmPassword)
      return console.log("unmatch");
    const postData = {
      email: userInput.register.email,
      username: userInput.register.username,
      password: userInput.register.password,
    };
    console.log(postData);
    setUserInput((prev) => ({
      ...prev,
      register: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    }));
  };

  if (loading) {
    return (
      <>
        <div
          style={{
            backgroundImage: `url('/img/bg-img/bg-${
              location.pathname === "/" ? "login" : "register"
            }.jpg')`,
          }}
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
        handleLoginChange,
        handleRegisterChange,
        handleLoginSubmit,
        handleRegisterSubmit,
        messageAfterLogin,
        message,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
