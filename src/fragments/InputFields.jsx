import Input from "../elements/Input";
import Label from "../elements/Label";

const InputFields = ({
  id,
  type,
  placeholder,
  htmlFor,
  labelText,
  children,
  value,
  name,
  handleChange,
}) => {
  return (
    <div className='relative flex flex-col gap-1 md:gap-1.5 w-full'>
      <Label htmlFor={htmlFor} labelText={labelText} />
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {children}
    </div>
  );
};

export default InputFields;
