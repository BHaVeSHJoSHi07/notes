import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function SignUp2() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""});
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/create-user", {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({name: credentials.name, email:credentials.email, password:credentials.password}),
      });
          const json = await response.json();
          console.log(json);
          if(json.success===true){
              localStorage.setItem('auth-token', response.json)
              navigate('/')
          }
      else{
          alert("this is wrong creds")
      }
    };
  
    const handleOnChange = (e)=>{
      setCredentials({...credentials , [e.target.name]: e.target.value})
    }
  return (
    (<div> <form onSubmit={handleSubmit}>
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
          value={credentials.password}
          onChange={handleOnChange}
          minLength={8}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary4"
      disabled={!(credentials.cpassword === credentials.password) }>
        SignUp
      </button>
    </form></div>)
  );
}

