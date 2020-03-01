import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import Box from '3box';
import ProfileHover from 'profile-hover';

export default class Game extends Component {
  handleNewJoiner = async () => {
    const address = "0x9Eb6a33451643A564049f6D65b077E3308717b54"; // kovan

    const MAX_UINT256 =
      "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    const patientZeroAddress = "0xd66E40b0c30595bEc72153B502aC1E0c4785991B";
    //approves DAPP to send DAI
    const receipt = await this.props.erc20.methods
      .approve(address, MAX_UINT256)
      .send({ from: this.props.accounts[0] });
    console.log(receipt);

        // const MAX_UINT256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
        // const patientZeroAddress = '0xd66E40b0c30595bEc72153B502aC1E0c4785991B'
        //approves DAPP to send DAI
        // const receipt = await this.props.erc20.methods.approve(address, MAX_UINT256).send({from : this.props.accounts[0]});
        const startGame = await this.props.viralBankcontract.methods.startGame(patientZeroAddress).send({from : this.props.accounts[0]});
        // console.log(this.props.accounts[0])
        // const box = await Box.openBox(this.props.accounts[0], window.ethereum);
        // console.log("open box", box)
        // const space = await box.openSpace('ethlondon');
        // console.log("open space", space)
        // await space.syncDone;
        // const thread = await space.joinThread('sticktogether');
        // const posts = await thread.getPosts();
        // console.log('post1', posts);
        // await thread.post(this.props.accounts[0]);
        
        // const posts2 = await thread.getPosts();
        // console.log("2", posts2)
    }

    // componentDidMount = async ()=>{
    //     const poolMembers = await Box.getThread('ethlondon', 'sticktogether', '0x64327CE3fD23E8f76D959fc8aB2461fe4C43c00a', false)
    //     console.log('pool', poolMembers);
    // }
    handleDeposit = async () => {
        const deposit = await this.props.viralBankcontract.methods.buyInToRound().send({from : this.props.accounts[0]});
    }

    render() {
        return (<div>
            <Container>
                <Row>
                    <Col>
                        <Card
                            title={"Monthly Saving Target"}
                            amount={"$20"}
                        />
                    </Col>
                    <Col>
                        <Card
                            title={"Game Duration"}
                            amount={"1"}
                            subtext={"year"}
                        />
                    </Col>
                    <Col>
                    <Card
                            title={"Starts In"}
                            amount={"10"}
                            subtext={"days"}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop : '20px'}}>
                    <Button style={{margin : 'auto', borderRadius: '50px'}} 
                        onClick={this.props.newJoiner ? this.handleNewJoiner : this.handleDeposit}>
                        {this.props.newJoiner ? "Join Game": "Weekly Deposit"}
                    </Button>
                </Row>
                <Row style={{marginTop : '20px'}}>
                    <h2>Players</h2>
                </Row>
                <Row>
                   {['0x64327CE3fD23E8f76D959fc8aB2461fe4C43c00a', '0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386','0xd3a22b377298c4aa6cba9f4b1f42aa46c2085054', '0xd3a22b377298c4aa6cba9f4b1f42aa46c2085054', '0xd3a22b377298c4aa6cba9f4b1f42aa46c2085054', '0x5c44E8982fa3C3239C6E3C5be2cc6663c7C9387E'].map((address)=>(<Col><ProfileHover address={address} showName={true}/></Col>))} 
                </Row>
            </Container>
        </div>)
    }
}

class Card extends Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          textAlign: "center",
          backgroundColor: "darkblue",
          borderRadius: "50%",
          color: "white",
          padding: "37px",
          width: "200px",
          height: "200px",
          margin: "auto"
        }}
      >
        <p
          style={{
            marginBottom: "0",
            lineHeight: "1",
            fontWeight: "700"
          }}
        >
          {this.props.title}
        </p>
        <p
          style={{
            fontSize: "70px",
            marginBottom: "0",
            lineHeight: "1.3",
            fontWeight: "100"
          }}
        >
          {this.props.amount}
        </p>
        {this.props.subtext && <p>{this.props.subtext}</p>}
      </div>
    );
  }
}
