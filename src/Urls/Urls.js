import React from 'react';
import firebase from '../config/fbconfig';
import 'firebase/auth';
import 'firebase/firestore';
const db = firebase.firestore();

class Urls extends React.Component {
  

  URLS = () => {
      var user = localStorage.getItem("user");
      db.collection(user).get().then(data => {
          console.log(data);
      })

      return (
            <div className="offset-md-1 col-md-3 text-center" id="Main">
                <input type="text" className="form-control" id="string"/>
                <button className="btn btn-primary">Submit</button><br/>
                <div id="result"></div>
                <span id="err">URL exists! Please Enter Another</span>
            </div>
      );
  }
  render(){
    return (
      <div id="Urls">
        {this.URLS}
      </div>
    );
  }
}

export default Urls;
