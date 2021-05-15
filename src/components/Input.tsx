import React from "react";

type ButtonProps = {
  classes: string;
  placeholder: string;
  type: string;
};

const Input: React.FC<ButtonProps> = (props: ButtonProps) => (
  <input
    className={`input ${props.classes ? props.classes : ""}`}
    type={props.type}
    placeholder={props.placeholder}
  />
);

export default Input;
