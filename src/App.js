import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Button, Navbar, Nav, Card } from 'react-bootstrap';

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
                <Nav.Item><Link to="/notes">Notes</Link></Nav.Item>
              </Nav>
            )}

          </Navbar>
          <div className="container" style={{ paddingTop: '50px' }}>
            <h1>🦄3Book</h1>
            <p>A simple social site</p>
            {this.state.needToAWeb3Browser && <h2>Please install metamask🦊</h2>}
            {(!this.state.needToAWeb3Browser && !this.state.accounts) && <h2>Connect MetaMask🤝</h2>}
            {this.state.accounts && (
              <Switch>
                <Route path="/profile">
                  <Profile
                    ethAddress={this.state.accounts[0]}
                  />
                </Route>
                <Route path="/notes">
                  <Notes />
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


class Home extends Component {
  render() {
    return (<>
      <h1>Home</h1>
      <h2>{this.props.ethAddress}</h2>
    </>);
  }
}

class Profile extends Component {
  render() {
    return (<>
      <h1>Profile</h1>
    </>);
  }
}


class Notes extends Component {

  state = {
    view: false
  }

  publicSave = async (e) => {
    e.preventDefault();

    this.setState({publicNoteToSave : null});
    console.log("saved")
  }

  privateSave = async (e) => {
    e.preventDefault();

    this.setState({privateNoteToSave : null});
    console.log("saved");
  }
  render() {


    return (
      <div>
        <h2>Notes</h2>
        <br />
        <Button onClick={() => (this.setState({ view: !this.state.view }))}> {this.state.view ? "Add" : "View"}</Button>
        {!this.state.view && (<>
          <h3>📖Public</h3>
          <FormComponent
            handleSubmit={this.publicSave}
            onChange={(e)=>(this.setState({publicNoteToSave : e.target.value}))}
            value={this.state.publicNoteToSave}
            label="Save a Public Note"
            text="This text will be saved publicly on 3Box"
          />
          <br />

          <h3>🗝Private</h3>
          <FormComponent
            handleSubmit={this.privateSave}
            onChange={(e)=>(this.setState({privateNoteToSave : e.target.value}))}
            value={this.state.privateNoteToSave}
            label="Save a Private Note"
            text="This text will be encrypted and saved with 3Box"
          />
        </>)}
        {this.state.view && <>
          <h2>View</h2>
          <br />
          <h3>📖Public</h3>
          <br />
          <h3>🗝Private</h3>
        </>}
      </div>
    )
  }
}

class FormComponent extends Component {


  
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>

        <Form.Group>
          <Form.Label>{this.props.label}</Form.Label>
          <Form.Control
            type="text-area"
            as="textarea"
            placeholder="Note text"
            value={this.props.value || ""}
            onChange={this.props.onChange} />
          <Form.Text className="text-muted">
            {this.props.text}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>)
  }
}

