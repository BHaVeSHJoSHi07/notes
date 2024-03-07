import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password}),
    });
        const json = await response.json();
        console.log(json);
        if(json.success===true){
            localStorage.setItem('token', json.authtoken)
            props.showAlert(" user Login ", "success")
            navigate('/')
        }
    else{
        props.showAlert("Invalid Credentials ", "danger")

    }
  };

  const handleOnChange = (e)=>{
    setCredentials({...credentials , [e.target.name]: e.target.value})
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
