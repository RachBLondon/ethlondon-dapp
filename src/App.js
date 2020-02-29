import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Button, Navbar, Nav, Card, Container, Row, Col } from 'react-bootstrap';
import { Name } from './Constants';
import Home from './Home';
import Game from './Game';
import Box from '3box'
import leaderboardImage from './leaderboard.png';

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
      const profile = await Box.getProfile(this.state.accounts[0])
      console.log('profile', profile)
      const spaceList = await Box.listSpaces(this.state.accounts[0])
      console.log('spacelist', spaceList)
      const followers = await Box.getSpace(this.state.accounts[0], 'MyFollowers');
      console.log("followers", followers)
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
                <Nav.Item><Link to="/game">Game</Link></Nav.Item>
                <Nav.Item><Link to="/friends">Friends</Link></Nav.Item>
                <Nav.Item><Link to="/stats">Stats</Link></Nav.Item>
              </Nav>
            )}
          </Navbar>
          <div className="container" style={{ paddingTop: '50px' }}>
            {this.state.needToAWeb3Browser && <h2>Please install metamask🦊</h2>}
            {(!this.state.needToAWeb3Browser && !this.state.accounts) && <h2>Connect MetaMask🤝</h2>}
            {this.state.accounts && (
              <Switch>
                <Route path="/friends">
                  <h1 className="text-center">Friends</h1>
                  <p className="lead text-center">How are your friends doing</p>
                  <div className="leaderboard-wrapper">
                    <img src={leaderboardImage} alt="Leaderboard" />
                  </div>
                </Route>
                <Route path="/game">
                  <Game />
                </Route>
                <Route path="/stats">
                  <h2>Overview</h2>
                  <table className="table table-listing">
                    <tr>
                      <th>Game started</th>
                      <td>29.2.2020</td>
                    </tr>

                    <tr>
                      <th>Players</th>
                      <td>4</td>
                    </tr>

                    <tr>
                      <th>Active</th>
                      <td>3</td>
                    </tr>

                    <tr>
                      <th>Lost</th>
                      <td>1</td>
                    </tr>

                    <tr>
                      <th>aDAI prize pot</th>
                      <td>1.12 DAI</td>
                    </tr>

                    <tr>
                      <th>Days before end</th>
                      <td>355</td>
                    </tr>

                  </table>
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



