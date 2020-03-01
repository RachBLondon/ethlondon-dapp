import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="fullpager">
          <div className="banner">
            <h1>💰Save. 👯‍♀️ Invite friends. 🎯 Win.</h1>
            <h3>A blockchain game where punctual penny savers are rewarded.</h3>
            <br/>
            <p class="text-muted">Built on <a href="https://aave.com">Aave lending protocol and aDAI</a>.</p>
          </div>
        </div>
        <div className="fullpager">
          <div className="banner">
            <h1>Rules</h1>
            <h4>1️⃣ Deposit 9.90 DAI every week for a year.</h4>
            <br />
            <br />
            <h4>2️⃣ Go viral by teaming up with friends and get market beating interest.</h4>
            <br />
            <br />
            <h4>3️⃣ The earned interest goes to players finishing the challenge.</h4>
            <br />
            <br />
            <h4>... but don't 👻 ghost a week or all your interest is gone! 😥</h4>
          </div>
        </div>
        <div className="fullpager">
          <Carousel wrap={false} slide={false}>
            <Carousel.Item>
              <img className="d-block w-100" src={`./assets/1.svg`} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={`./assets/2.svg`} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={`./assets/3.svg`} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={`./assets/4.svg`} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={`./assets/5.svg`} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={`./assets/6.svg`} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={`./assets/7.svg`} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={`./assets/8.svg`} />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

const items = [];

for (var i = 1; i < 8; i++) {
  items.push(
    <Carousel.Item>
      <img className="d-block w-100" src={`./public/${i}.svg`} />
    </Carousel.Item>
  );
}
