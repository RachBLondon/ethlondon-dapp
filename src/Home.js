import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="fullpager">
          <div className="banner">
            <h1>Join the QuaranTeam</h1>
            <h3>Check in every week with</h3>
            <h1>9.90DAI</h1>
          </div>
        </div>
        <div className="fullpager">
          <div className="banner">
            <h4>Check in every two weeks for the whole year</h4>
            <br />
            <br />
            <h4>The interest pot is split amongst loyal savers</h4>
            <br />
            <br />
            <h4>Everyone gets back 100% of their principal</h4>
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
