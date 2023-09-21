import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../components/Toast.jsx";
import { loginRoute } from "../utils/APIroutes.js";
import axios from "axios";
import Connect from "../assets/connect.gif";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("nistinder-user")) {
      navigate("/");
    }
  }, []);

  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const toast = (arg) => {
    setMessage(arg);
    console.log("toast working" + arg);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (handelValidations()) {
      const { username, password } = values;
      const postData = { username, password };
      await axios
        .post(loginRoute, postData)
        .then((res) => {
          if (res.data.status === false) {
            toast(res.data.msg);
          }
          if (res.data.status === true) {
            let stringJsonData = JSON.stringify(res.data.userobj);
            localStorage.setItem("nistinder-user", stringJsonData);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(`this err is from the axios ${err}`);
        });
    }
  };
  const handelValidations = () => {
    const { username, password } = values;
    if (username.length < 3) {
      toast("Username is required");
      return false;
    }
    if (password.length < 3) {
      toast("Password is required");
      return false;
    }
    return true;
  };
  const handelChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <StyledForm>
      <Toast message={message} />
      <div className="form-holder">
        <form className="flex-center" onSubmit={(e) => handelSubmit(e)}>
          <h1>Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Passworld"
            onChange={(e) => handelChange(e)}
          />
          <button type="submit">Login to app</button>
          <div className="login">
            <Link to="/register">Don't have an account?</Link>
          </div>
        </form>
      </div>
    </StyledForm>
  );
};
const StyledForm = styled.div`
  position: absolute;
  background-color: var(--bgc);
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .form-holder {
    padding: 30px;
    background: linear-gradient(180deg, var(--grd-c1), var(--grd-c2));
    border-radius: 10px;
    form {
      flex-direction: column;
      h1 {
        color: white;
      }
      input {
        padding: 10px 30px;
        margin: 20px;
        border-radius: 3px;
        border: 1px solid grey;
        background-color: var(--bgc-acc);
      }
      button {
        padding: 8px;
        outline: none;
        border: none;
        margin-bottom: 20px;
        background-color: white;
        color: var(--but);
        font-weight: 700;
        font-size: 1.05rem;
        border-radius: 10px;
      }
    }
  }
`;
export default Login;
