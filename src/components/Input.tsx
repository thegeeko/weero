import React from "react";

type ButtonProps = {
  classes?: string;
  placeholder: string;
  type: string;
  id?: string;
  onChange?: Function;
  value?: string;
  error?: string;
  customProps?: object;
};

const Input: React.FC<ButtonProps> = (props: ButtonProps) => (
  <div className={props.error ? "input-error-cont" : ""}>
    <input
      {...props.customProps}
      onChange={(e) => (props.onChange ? props.onChange(e) : "")}
      className={`input ${props.error ? "input-error" : ""} ${
        props.classes ? props.classes : ""
      }`}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      id={props.id}
    />
    {props.error ? <p className="input-error-txt">{props.error}</p> : null}
  </div>
);

export default Input;
