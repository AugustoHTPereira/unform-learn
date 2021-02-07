import { useField } from "@unform/core";
import React, { useEffect, useRef } from "react";

type Props = { label?: string } & React.InputHTMLAttributes<HTMLInputElement>;

const InputText: React.FC<Props> = (props) => {
  const ref = useRef(null);
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(props.name || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: (ref) => ref.value,
      ref: ref.current,
      clearValue: (ref) => (ref.value = ""),
    });
  }, [fieldName, registerField]);

  return (
    <div className="input-content">
      {props.label && <label htmlFor={fieldName}>{props.label}</label>}
      <div className="input-control">
        <input
          name={fieldName}
          onChange={clearError}
          defaultValue={defaultValue}
          type="text"
          ref={ref}
          {...props}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
};

export default InputText;
