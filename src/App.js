import React, { Component } from 'react';
import './App.css';
import PasswordStrengthComponent from './password-strength';

const REGEX_EXPRESSIONS = {
  small_letter: /[a-z]/g,
  capital_letter: /[A-Z]/g,
  digit: /[0-9]/g,
  specail_character: /[-`~!@#$%^&*(_)+=}{[\]':;'"/?.,><|\\]/g,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complexity: 0
    }
  } 

  handleChange = event => {
    let new_password = event.target.value;
    this.computePasswordComplexity(new_password);
  }

  computePasswordComplexity(password) {
    let complexity = 0;
    let no_of_expressions = Object.keys(REGEX_EXPRESSIONS).length;
    let weightage_per_condition = 100 / (no_of_expressions + 1);
    let noofConditionPassed = 0;
    for (var condition in REGEX_EXPRESSIONS) {
      let expression = REGEX_EXPRESSIONS[condition]
      if(password.match(expression) != null){
        noofConditionPassed++;
      }
    }
    complexity = weightage_per_condition * noofConditionPassed;
    if(password.length >= 8){
      complexity = complexity + weightage_per_condition;
    }
    this.setState({ complexity })
  }

  render() {
    const { complexity } = this.state;
    return (
      <div className="App">
        <form className="login_form">
          New Password:
          <br></br>
          <input type="password" onChange={(e) => {this.handleChange(e)}}></input>
          <br></br>
          <br></br>
          <PasswordStrengthComponent complexity={complexity} />
        </form>
      </div>
    );
  }
}

export default App;
