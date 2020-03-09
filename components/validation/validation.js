export const registerValidation = values => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
    //con esto sabes si lo contiene
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const loginValidation = values => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
    //con esto sabes si lo contiene
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const productValidation = values => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.company) {
    errors.company = "Company is required";
  }
  if (!values.url) {
    errors.url = "Url is required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Invalid Url";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }

  return errors;
};
