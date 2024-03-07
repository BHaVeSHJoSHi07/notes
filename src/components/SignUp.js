import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({
    passwordError: '',
    confirmPasswordError: '',
  });

  const validatePassword = (password) => {
    // Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validate password
    const passwordError = validatePassword(credentials.password)
      ? ''
      : 'Create strong password as per the given instructions';
    setErrors({ ...errors, passwordError });
    

    // Validate confirm password
    const confirmPasswordError =
      credentials.cpassword === credentials.password
        ? ''
        : 'Passwords do not match';
    setErrors({ ...errors, confirmPasswordError});
 
    if(passwordError){
        props.showAlert(passwordError, "danger")
    }

    if(confirmPasswordError){
        props.showAlert(confirmPasswordError, "danger")
    }

    if (passwordError || confirmPasswordError) {
      return;
    }
    // If validations pass, proceed with form submission
    const response = await fetch("http://localhost:5000/api/auth/create-user", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json, json.error, response.success);

    if (json.success === true) {
      localStorage.setItem('token', json.authtoken);
      navigate('/');
    } else {
        props.showAlert(json.error, "danger");
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={handleOnChange}
            minLength={8}
            required
          />
          <p className="error">{errors.passwordError}</p>
          <p className="password-instruction">
            Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="cpassword"
            value={credentials.cpassword}
            onChange={handleOnChange}
            minLength={8}
            required
          />
          <p className="error">{errors.confirmPasswordError}</p>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            errors.passwordError
          }
        >
          SignUp
        </button>
      </form>
    </div>
  );
}
