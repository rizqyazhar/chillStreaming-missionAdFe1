const Input = ({ id, type, placeholder, value, name, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      className='px-3 md:px-5 py-2 md:py-3.5 border border-outlineBorder outline-none rounded-3xl text-light-secondary text-[9px] md:text-[16px] placeholder:text-light-secondary placeholder:font-lato'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete='off'
      required
    />
  );
};

export default Input;
