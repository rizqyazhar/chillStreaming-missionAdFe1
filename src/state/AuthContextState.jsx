import { createContext, useEffect, useState } from "react";
import { getUsers } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoginPage, setIsLoginPage] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Sorry something went wrong", err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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

  const [messageAfterLogin, setMessageAfterLogin] = useState(false);
  const [message, setMessage] = useState(false);
  const [iconForAuth, setIconForAuth] = useState(false);
  const [fillMessage, setFillMessage] = useState(false);
  const [matchCheck, setMatchCheck] = useState(false);

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
        setUsers,
        userInput,
        handleLoginChange,
        handleRegisterChange,
        messageAfterLogin,
        message,
        iconForAuth,
        fillMessage,
        setMessageAfterLogin,
        setMessage,
        setIconForAuth,
        setFillMessage,
        setUserInput,
        matchCheck,
        setMatchCheck,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
