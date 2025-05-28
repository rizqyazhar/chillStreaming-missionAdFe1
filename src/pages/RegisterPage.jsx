import { Link } from "react-router-dom";
import Button from "../elements/Button";
import AuthLayout from "../layouts/AuthLayout";
import ButtonFields from "../fragments/ButtonFields";
import InputFields from "../fragments/InputFields";
import { BiSolidHide } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../state/AuthContextState";

const LoginPage = () => {
  const { userInput, handleRegisterChange, handleRegisterSubmit } =
    useContext(AuthContext);

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
