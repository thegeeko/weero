import React from "react";

type ButtonProps = {
  children?: string;
  classes?: string;
  onClick?: Function;
  type?:"button" | "submit" | "reset" 
};

const Btn: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      onClick={() => props.onClick ? props.onClick() : ''}
      className={`btn ${props.classes ? props.classes : ""}`}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Btn;
