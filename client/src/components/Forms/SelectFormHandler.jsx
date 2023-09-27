import { forwardRef } from "react";

const SelectFormHandler = forwardRef(
  ({ register, inputName, name, label, data, keyValue, setState }, ref) => {
    return (
      <div style={{ display: "flex" }}>
        <label className="form__label">{label}:</label>
        <select
          style={{ padding: "4px", borderRadius: "5px" }}
          name={name}
          ref={ref}
          onChange={(e) => setState(e.target.value)}
          value={name}
        >
          <option
            key={Math.random() * (999 - 100 + 1) + 100}
            value={""}
          ></option>
          {data.map((option, i) => {
            return (
              <>
                <option key={`${option.id}${i}`} value={option.id}>
                  {option[keyValue]}
                </option>
              </>
            );
          })}
        </select>
      </div>
    );
  }
);

export default SelectFormHandler;
