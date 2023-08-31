import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../components/Toast";
import { registerRoute } from "../utils/APIroutes";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("nistinder-user")) {
      navigate("/");
    }
  }, []);
  const [values, setValues] = useState({
    username: "",
    email: "",
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
      const { username, email, password } = values;
      const postData = { username, email, password };
      await axios.post(registerRoute, postData)
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
          console.log(`this is error from axios ${err}`);
        });
    }
  };
  const handelValidations = () => {
    const { username, email, password } = values;
    if (username.length < 3) {
      toast("username length should be more than 3");
      return false;
    }
    if (password.length < 3) {
      toast("password length should be more than 3");
      return false;
    }
    return true;
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues((preVal) => {
      return { ...preVal, [name]: value };
    });
  };

  return (
    <StyledForm>
      <Toast message={message} />
      <div className="form-holder">
        <form className="form-center" onSubmit={(e)=>handelSubmit(e)}>
          <div className="heading">
            <h1>SignUp</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handelChange(e)}
          />
          <button type="submit">Create account</button>
          <div className="login">
            <Link to="/login">Already Have An Account?</Link>
          </div>
        </form>
      </div>
    </StyledForm>
  );
}

const StyledForm = styled.div`
  position: absolute;
  background-color: var(--bgc);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .form-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
      h1 {
        color: white;
      }
    }
  }
  .form-holder {
    padding: 30px;
    background: linear-gradient(180deg,var(--grd-c1), var(--grd-c2));
    border-radius: 10px;
    form {
      flex-direction: column;
      input {
        background-color: var(--bgc-acc);
        color:var(--h);
        padding: 10px 30px;
        margin: 20px;
        border-radius: 3px;
        border: 1px solid grey;
      }
      button {
        padding: 10px;
        outline: none;
        border: none;
        margin-bottom: 20px;
        background-color: white;
        color: var(--but);
        font-size: 1.05rem;
        font-weight: 700;
        border-radius: 10px;
      }
      .login {
        font-size: 14px;
      }
    }
  }
`;
