import React, {Component} from 'react';

export default class Home extends Component {
    render() {
      return (<>
        <h1>Home</h1>
        <h2>{this.props.ethAddress}</h2>
      </>);
    }
  }