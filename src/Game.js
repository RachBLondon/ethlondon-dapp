import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class Game extends Component {

    handleNewJoiner = async()=>{
        const address = '0x9Eb6a33451643A564049f6D65b077E3308717b54' // kovan

        const MAX_UINT256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
        const patientZeroAddress = '0xd66E40b0c30595bEc72153B502aC1E0c4785991B'
        //approves DAPP to send DAI
        const receipt = await this.props.erc20.methods.approve(address, MAX_UINT256).send({from : this.props.accounts[0]});
        console.log(receipt);

        const startGame = await this.props.viralBankcontract.methods.startGame(patientZeroAddress).send({from : this.props.accounts[0]});

        console.log('startGame', startGame)
    }

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
            </Container>
        </div>)
    }
}

class Card extends Component {
    render() {
        return (
            <div style={{
                textAlign: 'center', textAlign: 'center',
                backgroundColor: 'darkblue',
                borderRadius: '50%',
                color: 'white',
                padding: '37px',
                width: '200px',
                height: '200px',
                margin : 'auto'

            }}>
                <p style={{
                    marginBottom: '0', lineHeight: '1',
                    fontWeight: '700'
                }}>{this.props.title}</p>
                <p style={{
                    fontSize: '70px',
                    marginBottom: '0',
                    lineHeight: "1.3",
                    fontWeight: '100'
                }}>{this.props.amount}</p>
                {this.props.subtext && <p>{this.props.subtext}</p>}
            </div>
        )
    }
}