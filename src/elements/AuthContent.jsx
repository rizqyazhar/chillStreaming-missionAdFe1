import { useContext, useEffect } from "react";
import { AuthContext } from "../state/AuthContextState";
import { useLocation } from "react-router-dom";
import PopupMessage from "./popupMessage/PopupMessage";

const AuthContent = ({ children }) => {
  const {
    setIsLoginPage,
    isLoginPage,
    messageAfterLogin,
    message,
    fillMessage,
    matchCheck,
  } = useContext(AuthContext);
  const propText = [
    {
      title: "Masuk",
      subTitle: "Selamat Datang Kembali!",
      bgSrc: "login",
    },
    {
      title: "Daftar",
      subTitle: "Selamat Datang!",
      bgSrc: "register",
    },
  ];
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/register") {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
  }, [location.pathname, setIsLoginPage]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url('/img/bg-img/bg-${
            isLoginPage ? propText[0].bgSrc : propText[1].bgSrc
          }.jpg')`,
        }}
        className='relative min-h-screen bg-cover bg-center flex justify-center items-center'>
        <div className='absolute inset-0 bg-black/30'></div>
        {message && (
          <PopupMessage
            text={
              messageAfterLogin
                ? `${fillMessage ? "Login" : "Register"} successful!`
                : `${fillMessage ? "Login" : "Register"} failed!`
            }
          />
        )}
        {matchCheck && <PopupMessage text='Password Unmatch!' />}
        <div className='container relative z-10 py-44 flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center gap-5 md:gap-[37px] rounded-2xl bg-pageHeaderBackground/85 w-[306px] md:w-[529px] p-10'>
            <div>
              <img src='/logo/chill-logo.svg' className='w-[94px] md:w-full' />
            </div>

            <div className='flex flex-col justify-center items-center font-lato'>
              <h1 className='text-lg md:text-3xl font-bold text-white'>
                {isLoginPage ? propText[0].title : propText[1].title}
              </h1>
              <p className='text-[10px] md:text-lg font-normal text-white tracking[.2px]'>
                {isLoginPage ? propText[0].subTitle : propText[1].subTitle}
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthContent;
