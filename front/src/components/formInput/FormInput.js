import "./FormInput.css";
export default function FormInput({
  value,
  placeholder,
  name,
  type,
  inputStyle,
  onChange,
  src,
  onImgPress,
  imgStyle,
  isValid,
}) {
  return (
    <>
      <div className={isValid ? "inputContainer" : "containerError"}>
        <input
          placeholder={placeholder}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          className={inputStyle}
        />
        <img src={src} className={imgStyle} onClick={onImgPress} alt="icon" />
      </div>
    </>
  );
}
