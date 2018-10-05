
import React from 'react';
import PropTypes from 'prop-types';

export class PasswordStrengthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleRed: { width: '100%', background: '#F5F5f5' },
      StyleYellow: { width: '100%', background: '#F5F5f5' },
      styleGreen: { width: '100%', background: '#F5F5f5' },
      complexity: this.props.complexity,
    };
  }

  componentWillMount() {
    this.computeColorPercentage(this.props.complexity);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.complexity !== this.props.complexity) {
      this.computeColorPercentage(newProps.complexity);
    }
  }

  computeColorPercentage(complexity) {
    this.computeRedPasswordStrength(complexity);
    this.computeYellowPasswordStrength(complexity);
    this.computeGreenPasswordStrength(complexity);
  }

  computeRedPasswordStrength(complexity) {
    if (complexity === 0) {
      this.setState({
        styleRed: { width: `100%`, background: '#F5F5f5' },
      });
    } else if (complexity > 0 && complexity < 33.3) {
      const coloredPercentage = (complexity / 33.3) * 100;
      this.setState({
        styleRed: { width: `${coloredPercentage}%`, background: 'RED' },
      });
    } else {
      this.setState({
        styleRed: { width: `100%`, background: 'RED' },
      });
    }
  }

  computeYellowPasswordStrength(complexity) {
    if (complexity < 33.3) {
      this.setState({
        styleYellow: { width: `100%`, background: '#F5F5f5' },
      });
    } else if (complexity > 33.3 && complexity < 66.6) {
      const coloredPercentage = ((complexity - 33.3) / 33.3) * 100;
      this.setState({
        styleYellow: { width: `${coloredPercentage}%`, background: 'YELLOW' },
      });
    } else {
      this.setState({
        styleYellow: { width: `100%`, background: 'YELLOW' },
      });
    }
  }

  computeGreenPasswordStrength(complexity) {
    if (complexity < 66.6) {
      this.setState({
        styleGreen: { width: `100%`, background: '#F5F5f5' },
      });
    } else if (complexity > 66.6) {
      const coloredPercentage = ((complexity - 66.6) / 33.3) * 100;
      this.setState({
        styleGreen: { width: `${coloredPercentage}%`, background: 'GREEN' },
      });
    }
  }

  render() {
    const { styleRed, styleYellow, styleGreen } = this.state;
    return (
      <div className="password-strength-wrapper">
        <div id="red_item">
          <div id="red_item_bar" style={styleRed} />
        </div>
        <div id="yellow_item">
          <div id="yellow_item_bar" style={styleYellow} />
        </div>
        <div id="green_item">
          <div id="green_item_bar" style={styleGreen} />
        </div>
      </div>
    );
  }
}

PasswordStrengthComponent.propTypes = {
  complexity: PropTypes.number.isRequired,
};

export default PasswordStrengthComponent;

