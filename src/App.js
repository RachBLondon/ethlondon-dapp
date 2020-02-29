import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Button, Navbar, Nav, Card, Container, Row, Col } from 'react-bootstrap';
import { Name } from './Constants';
import Home from './Home';
import Game from './Game';

export default class App extends Component {

  state = {
    needToAWeb3Browser: false,
  }

  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }
  async componentDidMount() {
    await this.getAddressFromMetaMask();
    if (this.state.accounts) {
      // Now MetaMask's provider has been enabled, we can start working with 3Box
    }
  }
  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>
    }


    return (
      <Router>
        <div>
          <Navbar bg="light" expand="lg" style={{ minHeight: '40px' }}>
            {this.state.accounts && (
              <Nav fill style={{ width: "100%" }} >
                <Nav.Item><Link to="/">Home</Link></Nav.Item>
                <Nav.Item><Link to="/profile">Profile Update</Link></Nav.Item>
                <Nav.Item><Link to="/game">Game</Link></Nav.Item>
              </Nav>
            )}

          </Navbar>
          <div className="container" style={{ paddingTop: '50px' }}>
            <h1>{Name}</h1>
            <p>Save together</p>
            {this.state.needToAWeb3Browser && <h2>Please install metamask🦊</h2>}
            {(!this.state.needToAWeb3Browser && !this.state.accounts) && <h2>Connect MetaMask🤝</h2>}
            {this.state.accounts && (
              <Switch>
                <Route path="/profile">
                  <Profile
                    ethAddress={this.state.accounts[0]}
                  />
                </Route>
                <Route path="/game">
                  <Game />
                </Route>
                <Route path="/">
                  <Home
                    ethAddress={this.state.accounts[0]}
                  />
                </Route>
              </Switch>
            )}
          </div>
        </div>
      </Router>
    );
  }
}




class Profile extends Component {
  render() {
    return (<>
      <h1>Profile</h1>
    </>);
  }
}




