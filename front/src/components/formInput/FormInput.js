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
  withImg = true,
  withButton = false,
  onPublishClick,
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
        {withImg ? (
          <img src={src} className={imgStyle} onClick={onImgPress} alt="icon" />
        ) : null}

        {withButton ? (
          <a className="publish-button" onClick={onPublishClick}>
            Publier
          </a>
        ) : null}
      </div>
    </>
  );
}
