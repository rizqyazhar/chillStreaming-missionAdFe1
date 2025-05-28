import { Link } from "react-router-dom";
import ButtonFields from "../fragments/ButtonFields";
import InputFields from "../fragments/InputFields";
import { BiSolidHide } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../state/AuthContextState";
import { postUsers } from "../services/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    users,
    setUsers,
    userInput,
    handleRegisterChange,
    setMessageAfterLogin,
    setMessage,
    setIconForAuth,
    setFillMessage,
    setUserInput,
    setMatchCheck,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (userInput.register.password !== userInput.register.confirmPassword) {
      setMatchCheck(true);
      setUserInput((prev) => ({
        ...prev,
        register: {
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        },
      }));
      setTimeout(() => {
        setMatchCheck(false);
      }, 1000);
    } else {
      const postData = {
        email: userInput.register.email,
        username: userInput.register.username,
        password: userInput.register.password,
      };
      const emailMatch = users.some(
        (user) => user.email === userInput.register.email
      );
      setUserInput((prev) => ({
        ...prev,
        register: {
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        },
      }));
      if (!emailMatch) {
        setMessage(true);
        setMessageAfterLogin(true);
        setFillMessage(false);
        setIconForAuth(true);
        try {
          const newUser = await postUsers(postData);
          setUsers((prev) => [...prev, newUser]);

          setTimeout(() => {
            setMessage(false);
            navigate("/");
          }, 500);
        } catch (error) {
          console.error(error);
        }
      } else {
        setMessage(true);
        setMessageAfterLogin(false);
        setFillMessage(false);
        setIconForAuth(false);
        setTimeout(() => {
          setMessage(false);
        }, 1000);
      }
    }
  };

  return (
    <>
      <form
        className='w-full flex flex-col justify-center items-center gap-5 md:gap-[37px]'
        onSubmit={handleRegisterSubmit}>
        <InputFields
          id='email'
          name='email'
          type='email'
          placeholder='Masukkan username'
          htmlFor='username'
          labelText='Email'
          value={userInput.register.email}
          onChange={handleRegisterChange}
        />
        <InputFields
          id='username'
          name='username'
          type='text'
          placeholder='Masukkan username'
          htmlFor='username'
          labelText='Username'
          value={userInput.register.username}
          onChange={handleRegisterChange}
        />
        <InputFields
          id='password'
          name='password'
          type='password'
          placeholder='Masukkan kata sandi'
          htmlFor='password'
          labelText='Kata Sandi'
          value={userInput.register.password}
          onChange={handleRegisterChange}>
          <BiSolidHide className='absolute top-7 md:top-[50px] right-3 md:right-5 text-xs md:text-2xl text-light-disabled cursor-pointer' />
        </InputFields>
        <InputFields
          id='confirm-password'
          name='confirmPassword'
          type='password'
          placeholder='Masukkan kata sandi'
          htmlFor='password'
          labelText='Konfirmasi Kata Sandi'
          value={userInput.register.confirmPassword}
          onChange={handleRegisterChange}>
          <BiSolidHide className='absolute top-[29px] md:top-[50px] right-3 md:right-5 text-xs md:text-2xl text-light-disabled cursor-pointer' />
          <div className='w-full flex justify-between font-lato mt-1.5'>
            <p className='text-light-secondary text-[10px] md:text-base tracking-[.2px] cursor-default'>
              Sudah punya akun?
              <Link
                to='/'
                className='text-white text-[10px] md:text-sm cursor-pointer'>
                Masuk
              </Link>
            </p>
          </div>
        </InputFields>
        <ButtonFields text='Daftar' />
      </form>
    </>
  );
};

export default LoginPage;
