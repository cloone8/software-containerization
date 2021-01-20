import React from 'react';

class QuoteAdd extends React.Component {
  handleClick = () => {
      console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

export default QuoteAdd
