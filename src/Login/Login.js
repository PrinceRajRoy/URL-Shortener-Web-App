import React from 'react';
import './Login.css'
import firebase from '../config/fbconfig';
import 'firebase/auth';

class Login extends React.Component {

  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }

  login = e => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(err => {
      if(email !== '' && pass !== '')
        document.getElementById("err1").innerHTML = err.message + ", Please SignUp";
      else
        document.getElementById("err1").innerHTML = err.message;
      document.getElementById("err1").style.display = "block"; 
    }).then(() => {
      localStorage.setItem("user", email)
    });
  }
  
  signin = e => {
    e.preventDefault();
    document.getElementById("err2").innerHTML = "";
    var email = document.getElementById("email1").value;
    var pass = document.getElementById("pass1").value;
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(err => {
        document.getElementById("err2").innerHTML = err.message;
      document.getElementById("err2").style.display = "block";
    }).then(() => {
      localStorage.setItem("user", email)
    });
  }

  render(){
    return (
      <div>
        <div className="Login" id="loginForm">
        <form className="text-center" onSubmit={this.login}>
          <input className="form-control" placeholder="Email" type="email" id="email"/>
          <input className="form-control" placeholder="Password" type="password" id="pass"/>
          <span id="log">Password Should Be atleast 6 letters</span><br/>
          <button className="btn btn-success">Login</button><br/><br/>
          <span id="err1"></span>
        </form>
      </div>
      <div className="Login" id="signupForm">
        <form className="text-center" onSubmit={this.signin}>
          <input className="form-control" placeholder="Email" type="email" id="email1"/>
          <input className="form-control" placeholder="Password" type="password" id="pass1"/>
          <button className="btn btn-success">SignUp</button><br/><br/>
          <span id="err2"></span>
        </form>
      </div>
      </div>
    );
  }
}

export default Login;
