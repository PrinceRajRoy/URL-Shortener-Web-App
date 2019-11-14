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
      console.log(err);
      if(email !== '' && pass !== '')
        document.getElementById("err2").innerHTML = err.message + ", registering if 1st time user";
      else
        document.getElementById("err2").innerHTML = err.message;
      document.getElementById("err2").style.display = "block"; 
      firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => localStorage.setItem("user", email));
    }).then(() => localStorage.setItem("user", email));
  }
  
  render(){
    return (
      <div className="Login" id="loginForm">
        <form className="text-center" onSubmit={this.login}>
          <input className="form-control" placeholder="Email" type="text" id="email"/>
          <input className="form-control" placeholder="Password" type="password" id="pass"/>
          <span id="log">Password Should Be atleast 6 letters</span><br/>
          <button className="btn btn-success">Login</button><br/><br/>
          <span id="err2"></span>
        </form>
      </div>
    );
  }
}

export default Login;
