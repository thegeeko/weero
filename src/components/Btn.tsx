import React from "react";

type ButtonProps = {
  children?: string;
  classes: string;
};

const Btn: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button className={`btn ${props.classes ? props.classes : ""}`}>
      {props.children}
    </button>
  );
};

export default Btn;
