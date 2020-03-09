import { useState } from "react";

const useForm = (initialState, validate, callback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    callback();
  };

  //con esto hacemos por si el usuario selecciona otro campo y este ya es valido pues queda como valido
  const handleBlur = () => {
    const errs = validate(values);
    setErrors(errs);
  };
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur
  };
};

export default useForm;
