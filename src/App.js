import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// <<<<<<< HEAD
// import { Form, Button, Navbar, Nav, Card, Container, Row, Col } from 'react-bootstrap';
// import { Name } from './Constants';
// import Home from './Home';
// import Game from './Game';
// import Box from '3box';
// import Web3 from 'web3';
// import { ABI } from './ABI';
// import { ERC20Abi } from './IERC20';
// import Loader from 'react-loader-spinner';
// =======
import {
  Form,
  Button,
  Navbar,
  Nav,
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";
import {
  FaBars,
  FaUsers,
  FaRegChartBar,
  FaCoins,
  FaHome,
  FaGhost,
  FaGithub
} from "react-icons/fa";
import { Name } from "./Constants";
import Home from "./Home";
import Game from "./Game";

import Box from "3box";
import Web3 from "web3";
import { ABI } from "./ABI";
import { ERC20Abi } from "./IERC20";
import leaderboardImage from "./leaderboard.png";
import Loader from 'react-loader-spinner';
// >>>>>>> 934be43303d4eb54f61b1f4ceff2c3023d5bfbc0

export default class App extends Component {
  state = {
    needToAWeb3Browser: false
  };

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

      const web3 = new Web3(window.ethereum)

      const address = "0x9Eb6a33451643A564049f6D65b077E3308717b54"; // kovan

      const viralBankcontract = new web3.eth.Contract(ABI, address);

      const erc20 = new web3.eth.Contract(
        ERC20Abi,
        "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD"
      );
      console.log("contract", viralBankcontract, erc20);
      this.setState({ viralBankcontract, erc20 });
      const MAX_UINT256 =
        "115792089237316195423570985008687907853269984665640564039457584007913129639935";


      const checkPlayerStatus = await this.state.viralBankcontract.methods.getPlayerState(this.state.accounts[0]).call();
      const isNewJoiner = checkPlayerStatus == 0;
      console.log('isNewjoiner', isNewJoiner, 'checkPlayerStatue', checkPlayerStatus)
      this.setState({isNewJoiner});
      // //approves DAPP to send DAI
      // const receipt = await erc20.methods.approve(address, MAX_UINT256).send({from : this.state.accounts[0]});
      // console.log(receipt)

      // Now MetaMask's provider has been enabled, we can start working with 3Box
    }
  }
  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>;
    }

    return (
      <Router>
        <div>
          <Navbar bg="light" expand="true" style={{ minHeight: "40px" }}>
            <Navbar.Brand href="#home"><FaGhost /> GoodGhosting.com</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {this.state.accounts && (
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav fill style={{ width: "100%" }}>
                  <Nav.Item>
                    <Link to="/home">
                      <FaHome /> Home
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/game">
                      <FaCoins /> Play
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/friends">
                      <FaUsers /> Friends
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/stats">
                      <FaRegChartBar />
                      Stats
                    </Link>
                  </Nav.Item>

                  <Nav.Item>
                    <a href="https://github.com/miohtama/viral-aave-save-game">
                      <FaGithub />
                      Github
                    </a>
                  </Nav.Item>

                </Nav>
              </Navbar.Collapse>
            )}
          </Navbar>
          <div className="container" style={{ paddingTop: "50px" }}>
            {this.state.needToAWeb3Browser && (
              <h2>Please install metamask🦊</h2>
            )}
            {!this.state.needToAWeb3Browser && !this.state.accounts && (
              <h2>Connect MetaMask🤝</h2>
            )}
            {this.state.accounts && (
              <Switch>
                <Route path="/friends">
                  <div className="banner">
                    <h1 className="text-center">Friends</h1>
                    <p className="lead text-center">
                      How are your friends doing
                    </p>
                    <p className="lead text-center">
                      You have earned extra 🏅<strong>0.5%</strong> interest
                      thru your friends
                    </p>
                    <div className="leaderboard-wrapper">
                      <img src={leaderboardImage} alt="Leaderboard" />
                    </div>
                  </div>
                </Route>
                <Route path="/game">
                  {!this.state.erc20 &&(
                                        <Loader
                                          style={{textAlign : "center" }}
                                          type="Grid"
                                          color="#2EBAC6"
                                          height={100}
                                          width={100}
                                          timeout={30000} //3 secs
                                        />)}

                                     
                  {this.state.erc20 && <Game 
                    accounts={this.state.accounts} 
                    erc20={this.state.erc20} 
                    viralBankcontract={this.state.viralBankcontract}
                    newJoiner={this.state.isNewJoiner} 
                    />} 

                </Route>
                <Route path="/stats">
                  <div className="banner">
                    <h2>Week #4</h2>
                    <table className="table table-listing table-stats">
                      <tr>
                        <th>👻Players</th>
                        <td>4</td>
                      </tr>

                      <tr>
                        <th>🕺Active</th>
                        <td>3</td>
                      </tr>

                      <tr>
                        <th>💀Lost</th>
                        <td>1</td>
                      </tr>

                      <tr>
                        <th>🎉 aDAI prize pot</th>
                        <td>1.12 DAI</td>
                      </tr>

                      <tr>
                        <th>⏳ Days before end</th>
                        <td>335</td>
                      </tr>
                    </table>
                    <h2>Top infectors</h2>
                    <table className="table table-listing">
                      <tr>
                        <th>Patient0</th>
                        <td>0x2f4cE4...</td>
                        <td>❤️ 3 friends</td>
                      </tr>
                      <tr>
                        <th>Rachel</th>
                        <td>0xe1C6E2...</td>
                        <td>❤️ 1 friends</td>
                      </tr>
                    </table>
                  </div>
                </Route>
                <Route path="/">
                  <Home ethAddress={this.state.accounts[0]} />
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
    return (
      <>
        <h1>Profile</h1>
      </>
    );
  }
}
