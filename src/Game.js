import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class Game extends Component {
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
                    <Button style={{margin : 'auto', borderRadius: '50px'}}>Join Game</Button>
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