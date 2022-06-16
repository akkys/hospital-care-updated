import React from "react";
import InputField from "./InputField";

const ReUseComp = ({
  label,
  inputType,
  rows,
  type,
  name,
  value,
  setValue,
  data,
  placeholder,
  avatar,
}) => {
  return (
    <>
      {avatar && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className={avatar} />
            </span>
          </div>
          <InputField
            data={data}
            inputType={inputType}
            type={type}
            name={name}
            rows={rows}
            value={value}
            setValue={setValue}
            placeholder={placeholder}
          />
        </div>
      )}
      {!avatar && (
        <div className="form-group row">
          <label className="col-md-4">{label}</label>
          <div className="col-md-8">
            <InputField
              data={data}
              inputType={inputType}
              type={type}
              name={name}
              rows={rows}
              value={value}
              setValue={setValue}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReUseComp;
