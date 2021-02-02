import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton: React.FC<Props> = (props) => {
  return (
    <button className="btn" {...props} type="submit">
      {props.children}
    </button>
  );
};

export default SubmitButton;
