import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import styled from 'styled-components';
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core';
import axios from 'axios';
import {
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import workplace from './assets/images/image.png';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1D2429'
    }
  }
});

const Styles = styled.div`
  .cont {
    min-height: 100vh;
    background: #1D2429 ! important;
  }
  .login{
    width: 280px;
    background: #f1f1f1;
    height: 330px;
    padding:25px 25px;
    border-radius: 10px;
    font-size: 14px;
    position:absolute;
    left: 80%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .form-group{
    margin-bottom:1em;
    transition:all .3s;
  }
  .form-label{
    font-size:1em;
    font-size: 16px;
    color: #aaa;
    display:block;
    opacity:1;
    transform:translateY(-1.7em);
    transform-origin:0 0;
    transition:all .3s;
  }
  .form-control{
    box-shadow:none;
    background: #f1f1f1;
    border-radius:0px;
    border: 1px solid #aaa;
    border-style:none none solid none;
    width: 100%;
    transition:all .5s;
    padding: 5px;
  }
  .form-control::placeholder{
    color:transparent;
  }
  .form-control:focus{
    box-shadow:none;
    outline:none;
    border-color:#00BFFF;
  }
  .form-control:focus + .form-label,
  .form-control:not(:placeholder-shown) + .form-label
  {
    transform:translateY(-3.5em) scale(.8);
    color: #00BFFF;
  }
  .form-group:focus-within{
    transform:scale(1.05,1.05);
  }
`;

const createHistory = require("history").createBrowserHistory;


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [state, setState] = useState(false);
  function handleSubmit() {
    let data = { username: username, password: password }
    axios.post('/login', data).then((res) => {
      console.log(res.data.info)
      if (res.data.msg === "success") {
        axios.post('/set-cookie', res.data.info).then((res) => {
          console.log(res)
        })
        let history = createHistory();
        history.push("/dashboard");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
      }
      else {
        setState(true)
      }
    })
  };
  return (
    <div>
      <Styles>
        <div className="cont">
          <div style={{display:"flex",flexWrap:"wrap",padding:"1em"}}>
            <div><p style={{color:"red",fontSize:"4em",marginTop:"-23px",marginRight:"-45px"}}>.</p></div>
            <div><h2 style={{color:"#fff",padding:"25PX"}}>A P T I V</h2></div>
            <div><p style={{color:"red",fontSize:"4em",marginTop:"-23px",marginLeft:"-15px"}}>.</p></div>
          </div>
          <Form className="login" onSubmit={handleSubmit}>
            <p style={{ fontSize: "200%", textAlign: "center", marginTop: "0px", marginBottom: "30px" }}>Login</p>
            <ThemeProvider theme={theme}>
              <TextField label="Username" style={{ width: "100%" }} onChange={e => setUsername(e.target.value)} required />
              <br />
              <br />
              <TextField label="Password" style={{ width: "100%" }} type={showPassword ? "text" : "password"} onChange={e => setPassword(e.target.value)} InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }} required />
            </ThemeProvider>
            <br />
            <br />
            <br />
            <Button style={{ backgroundColor: "#1D2429", color: "#fff", outline: "none", borderRadius: "0px", width: "100%" }} variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            {state === true
              ?
              <p style={{ color: "red", paddingTop: "10px" }}>username or password is incorrect</p>
              :
              <p></p>
            }
          </Form>
        </div>
      </Styles >
    </div>
  );
}

export default Login;
