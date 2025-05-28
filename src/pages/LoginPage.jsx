import { Link } from "react-router-dom";
import ButtonFields from "../fragments/ButtonFields";
import InputFields from "../fragments/InputFields";
import { BiSolidHide } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../state/AuthContextState";

const LoginPage = () => {
  const { userInput, handleChange } = useContext(AuthContext);
  return (
    <>
      <InputFields
        id='username'
        name='username'
        type='text'
        placeholder='Masukkan username'
        htmlFor='username'
        labelText='Username'
        value={userInput.login.username}
        onChange={handleChange}
      />
      <InputFields
        id='password'
        name='password'
        type='password'
        placeholder='Masukkan kata sandi'
        htmlFor='password'
        labelText='Kata Sandi'
        value={userInput.login.password}
        onChange={handleChange}>
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
      <ButtonFields />
    </>
  );
};

export default LoginPage;
