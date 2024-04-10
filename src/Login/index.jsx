import React, { useState } from 'react'
import login_icon from '../imges/login_icon.svg'
import { loginUser } from '../services/actionCreator';
import { useNavigate } from 'react-router-dom';
import { toaster } from '../services/toaster';
import { setlocalStorage } from '../services/helper';

const Login = () => {

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const login = () => {
    if (!email || !password) {
      toaster(`Please fill the ${!email ? "eamil" : "password"}`, 'error')
      return;
    }
    const reqBody = {
      email: email, password: password
    }
    loginUser(reqBody).then((data) => {
      if (data.success) {
        toaster("Login Successfully", 'success');
        let _data = JSON.stringify(data)
        setlocalStorage("loggedUser", _data)
        navigate('/home')
      }
    })
      .catch((err) => {
        toaster(err?.response?.data, 'error');
        console.log("error -=-=-= ", err)
      })
  }
  return (
    <div className="container page">
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card my-5 d-flex text-left">
          <div className="row">
            <div className='col-md-12 '>
              <h2 className="text-dark mt-5 text-center">Sign In</h2>
              <div className=" mb-5 font-weight-bold brand-color-text text-uppercase text-center">
                New user?{" "}
                <a className="text-decoration-none" href="/registration">
                  Create an account
                </a>
              </div>
              <form className="card-body cardbody-color p-lg-5">
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="email"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    aria-label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center ">
                  <button type="button" className="btn btn-primary px-5 mt-5 w-50" onClick={() => login()}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
