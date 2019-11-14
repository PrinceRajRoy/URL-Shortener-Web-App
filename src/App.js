import React from 'react';
import './App.css';
import firebase from './config/fbconfig';
import 'firebase/auth';
import 'firebase/firestore';
import Login from './Login/Login';

const db = firebase.firestore();

class App extends React.Component {
  

  Query = e => {
    e.preventDefault();
    document.getElementById("err").style.display = "none";
    document.getElementById("result").innerHTML = "";
    var user = localStorage.getItem("user");
    var ogURL = document.getElementById("string").value;
    db.collection(user).doc(ogURL).get().then((snapshot) => {
        if(snapshot.exists){
          if(user != null)
          document.getElementById("err").style.display = "block";
        }
        else{
            //For considering both capital and small letters
            var temp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var rnd = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
            var URL = 'https://heroku.com/' + this.generateURL(rnd, temp);

            document.getElementById("result").innerHTML = "Generated URL : " + URL;
            console.log(user);
            db.collection(user).doc(ogURL).set({
              shortURL: URL
            }, {merge: true});
            this.fetch();
        }
    });
  }

  //
  generateURL = (num, temp) => {
    if(num === 0)
      return '';
    else
      return this.generateURL(Math.floor(num/62), temp) + temp[num % 62];
  }

  login1 = () => {
    var x = document.getElementById("loginForm").style.display;
    console.log(x);
    if(x === "block")
        document.getElementById("loginForm").style.display = "none";
    else
        document.getElementById("loginForm").style.display = "block";
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      console.log("Successfully Logged Out");
    })
  }

  state = {
    name: "ABC",
    urls: []
  }

  vis = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.setState({
        name: user.email
      });
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("login").style.display = "none";
      document.getElementById("loggedin").style.display = "block";
      this.fetch();
    } else {
      document.getElementById("login").style.display = "block";
      document.getElementById("loggedin").style.display = "none";
    }
  });

  generatedURLS = (val) => {
    document.getElementById("mainBody").style.display = val ? "none" : "block";
    document.getElementById("urlButton").style.display = val ? "none" : "block";
    document.getElementById("homeButton").style.display = val ? "block" : "none";
    document.getElementById("Urls").style.display = val ? "block" : "none";
  }

  fetch = () => {
    this.setState({urls: []});
    var user = localStorage.getItem("user");
    db.collection(user).get().then(data => {
      data.docs.forEach(doc => {
        console.log(doc.data(), doc.id)
        this.setState({
          urls: [...this.state.urls, <li className="list-group-item">{doc.id} : {doc.data()['shortURL']}</li>]
        })
      })
    })
  }

  render(){
    return (
      <div className="App">
        <header id="header">
          <div id="loggedin" onClick={() => this.logout()}>
            <span id="name">{this.state.name}</span>
            <i className="fa fa-sign-out"></i>
          </div>
          <div id="login" onClick={() => this.login1()}>
            <span>Login</span>
            <i className="fa fa-sign-in"></i>
          </div>
        </header>
        <Login />
        <div className="container" id="mainBody">
          <div className="row">
            <form className="offset-md-1 col-md-6 text-center" id="Main"  onSubmit={this.Query}>
                <input type="text" className="form-control" id="string"/>
                <button className="btn btn-primary">Submit</button><br/>
                <div id="result"></div>
                <span id="err">URL exists! Please Enter Another</span>
            </form>
            <div className="offset-md-1 col-md-4 text-center" id="links">
                Generated Urls
                {this.state.urls}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
