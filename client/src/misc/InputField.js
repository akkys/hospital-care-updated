import React from "react";

const InputField = ({
  inputType,
  type,
  name,
  rows,
  value,
  setValue,
  data,
  placeholder,
}) => {
  return (
    <>
      {inputType === "text" && (
        <>
          <input
            type={type}
            className="form-control form-control-sm"
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
        </>
      )}
      {inputType === "textarea" && (
        <textarea
          type={type}
          className="form-control form-control-sm"
          name={name}
          rows={rows}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {inputType === "select" && (
        <select
          className="form-control form-control-sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          {data.map((d, i) => {
            return (
              <option key={i} value={d}>
                {d}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
};

export default InputField;
