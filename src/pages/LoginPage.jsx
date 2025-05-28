import { Link } from "react-router-dom";
import ButtonFields from "../fragments/ButtonFields";
import InputFields from "../fragments/InputFields";
import { BiSolidHide } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../state/AuthContextState";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    users,
    userInput,
    handleLoginChange,
    setMessageAfterLogin,
    setMessage,
    setIconForAuth,
    setFillMessage,
    setUserInput,
  } = useContext(AuthContext);

  const navigate = useNavigate();

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
  return (
    <>
      <form
        className='w-full flex flex-col justify-center items-center gap-5 md:gap-[37px]'
        onSubmit={handleLoginSubmit}>
        <InputFields
          id='username'
          name='username'
          type='text'
          placeholder='Masukkan username'
          htmlFor='username'
          labelText='Username'
          value={userInput.login.username}
          onChange={handleLoginChange}
        />
        <InputFields
          id='password'
          name='password'
          type='password'
          placeholder='Masukkan kata sandi'
          htmlFor='password'
          labelText='Kata Sandi'
          value={userInput.login.password}
          onChange={handleLoginChange}>
          <BiSolidHide className='absolute top-[29px] md:top-[50px] right-3 md:right-5 text-xs md:text-2xl text-light-disabled cursor-pointer' />
          <div className='w-full flex justify-between font-lato mt-1.5'>
            <p className='text-light-secondary text-[10px] md:text-base tracking-[.2px] cursor-default'>
              Belum punya akun?
              <Link
                to='/register'
                className='text-white text-[10px] md:text-sm cursor-pointer'>
                Daftar
              </Link>
            </p>
            <p className='text-white text-[10px] md:text-base cursor-pointer'>
              <Link to='/register'>Lupa kata sandi?</Link>
            </p>
          </div>
        </InputFields>
        <ButtonFields text='Masuk' />
      </form>
    </>
  );
};

export default LoginPage;
