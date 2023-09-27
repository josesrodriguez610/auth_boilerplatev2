import React from "react";

const InputFormHandler = ({
  inputName,
  inputType,
  label,
  required,
  defaultValue,
  register,
  setState,
}) => {
  let step = "";
  if (inputType === "number") {
    step = ".01";
  }

  const handleChange = (e) => {
    if (setState !== undefined) {
      setState(e.target.value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: "4px",
        paddingBottom: "4px",
      }}
    >
      <label className="form__label">{label}:</label>
      <input
        style={{ padding: "4px", borderRadius: "5px" }}
        defaultValue={defaultValue}
        type={inputType}
        step={step}
        {...register(inputName, {
          required,
        })}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputFormHandler;
