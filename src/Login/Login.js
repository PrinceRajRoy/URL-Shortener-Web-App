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
      firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => localStorage.setItem("user", email));
    }).then(() => localStorage.setItem("user", email));
  }
  
  render(){
    return (
      <div className="Login" id="loginForm">
        <form className="text-center" onSubmit={this.login}>
          <input className="form-control" placeholder="Email" type="text" id="email"/>
          <input className="form-control" placeholder="Password" type="password" id="pass"/>
          <span id="log">Password Should Be atleast 6 letters</span>
          <button className="btn btn-success">Login</button><br/>
          {/*<span id="err">User Not Registered Previously, Registering Now</span>*/}
        </form>
      </div>
    );
  }
}

export default Login;
