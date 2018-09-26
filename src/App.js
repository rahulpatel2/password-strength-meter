import React, { Component } from 'react';
import './App.css';

class App extends Component {

  REGEX_EXPRESSIONS = {
    small_letter: "\/[a-z]\/g",
    capital_letter: "\/[A-Z]\/g",
    digit: "\/[0-9]\/g",
    specail_character: "\/[!@\\#$%^&*()]\/g"
  };

  handleChange = event => {
    let new_password = event.target.value;
    let complexity = this.computePasswordComplexity(new_password);
    this.ShowPasswordStrength(complexity)
  }

  computePasswordComplexity = password => {
    let complexity = 0;
    let no_of_expressions = Object.keys(this.REGEX_EXPRESSIONS).length;
    let weightage_per_condition = 100 / (no_of_expressions + 1)
    for (var condition in this.REGEX_EXPRESSIONS) {
      let expression = this.REGEX_EXPRESSIONS[condition]
      if(password.match(eval(expression)) != null){
        complexity = complexity + weightage_per_condition;
      }
    }
    if(password.length >= 8){
      complexity = complexity + weightage_per_condition;
    }
    return complexity;
  }

  ShowPasswordStrength = complexity => {
    this.ShowRedPasswordStrength(complexity);
    this.ShowYellowPasswordStrength(complexity);
    this.ShowGreenPasswordStrength(complexity);
  }

  ShowRedPasswordStrength = complexity => {
    let RedBar = document.getElementById("red_item_bar");
    if(complexity == 0){
      RedBar.setAttribute("style","width:100%; background-color:#f5f5f5");
    }
    if(complexity > 0 && complexity < 33.3){
      let colored_percentage = (complexity / 33.3) * 100
      RedBar.setAttribute("style","width:"+ colored_percentage + "%; background-color:red");
    }
    if(complexity >= 33.3){
      RedBar.setAttribute("style","width:100%; background-color:red");
    }
  }

  ShowYellowPasswordStrength = complexity => {
    let YellowBar = document.getElementById("yellow_item_bar");
    if(complexity < 33.3){
      YellowBar.setAttribute("style","width:100%; background-color:#f5f5f5");
    }
    if(complexity > 33.3 && complexity < 66.6){
      let colored_percentage = ((complexity - 33.3) / 33.3) * 100
      YellowBar.setAttribute("style","width:"+ colored_percentage + "%; background-color:yellow");
    }
    if(complexity >= 66.6){
      YellowBar.setAttribute("style","width:100%; background-color:yellow");
    }
  }

  ShowGreenPasswordStrength = complexity => {
    let GreenBar = document.getElementById("green_item_bar");
    if(complexity < 66.6){
      GreenBar.setAttribute("style","width:100%; background-color:#f5f5f5");
    }
    if(complexity > 66.6){
      let colored_percentage = ((complexity - 66.6) / 33.3) * 100
      GreenBar.setAttribute("style","width:"+ colored_percentage + "%; background-color:green");
    }
  }

  render() {
    return (
      <div className="App">
        <form class="login_form">
          New Password:
          <br></br>
          <input type="password" onChange={(e) => {this.handleChange(e)}}></input>
          <br></br>
          <br></br>
          <div class="flex_container">
            <div id="red_item">
              <div id="red_item_bar"></div>
            </div>
            <div id="yellow_item">
              <div id="yellow_item_bar"></div>
            </div>
            <div id="green_item">
              <div id="green_item_bar"></div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
