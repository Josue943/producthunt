import React from "react";
import styled from "@emotion/styled";

const FormControl = ({
  name,
  Label,
  onChange,
  placeholder,
  value,
  onBlur,
  type
}) => {
  if (!type) {
    type = "text";
  }
  return (
    <Form>
      <label htmlFor={name}>{Label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </Form>
  );
};

export default FormControl;

export const Form = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  /* 0 0 crece y 150 tamaño */
  label {
    flex: 0 0 150px;
  }
  input {
    flex: 1;
    padding: 0.5rem;
  }
`;
