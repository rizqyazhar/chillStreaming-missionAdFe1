import { createContext, useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

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
  const [messageAfterLogin, setMessageAfterLogin] = useState(false);
  const [message, setMessage] = useState(false);
  const [iconForAuth, setIconForAuth] = useState(false);
  const [fillMessage, setFillMessage] = useState(false);
  const [matchCheck, setMatchCheck] = useState(false);

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

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const matchUserLogin = users.some(
      (user) =>
        user.username === userInput.login.username &&
        user.password === userInput.login.password
    );

    if (matchUserLogin) {
      setMessage(true);
      setMessageAfterLogin(true);
      setFillMessage(true);
      setIconForAuth(true);
      setTimeout(() => {
        navigate("/home");
      }, 100);
    } else {
      setMessage(true);
      setMessageAfterLogin(false);
      setFillMessage(true);
      setIconForAuth(true);
      setTimeout(() => {
        setMessage(false);
      }, 1000);
    }

    setUserInput((prev) => ({
      ...prev,
      login: {
        username: "",
        password: "",
      },
    }));
  };

  if (loading) {
    return (
      <>
        <div className='inset-0 min-h-screen bg-pageHeaderBackground flex justify-center items-center'></div>
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
        handleLoginSubmit,
        matchCheck,
        setMatchCheck,
        setMessage,
        setMessageAfterLogin,
        setFillMessage,
        setIconForAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
