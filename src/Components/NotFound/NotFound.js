import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default class NotFound extends Component {
  render() {
    return (
      <div className="bg-purple">
        <div className="stars">
          <div className="custom-navbar">
            <div className="brand-logo">
              <Link to="/">
                <img src={require("./logo.svg")} style={{ width: "150px" }} />
              </Link>
            </div>
            <div className="navbar-links">
              <ul>
                <li>
                  <Link className="btn-go-home" to="/">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="central-body">
            <img
              className="image-404"
              src={require("./404.svg")}
              width="300px"
            />
            <Link className="btn-go-home" to="/">
              Return to Home Page
            </Link>
          </div>
          <div className="objects">
            <img
              className="object_rocket"
              src={require("./rocket.svg")}
              width="40px"
            />
            <div className="earth-moon">
              <img
                className="object_earth"
                src={require("./earth.svg")}
                width="100px"
              />
              <img
                className="object_moon"
                src={require("./moon.svg")}
                width="80px"
              />
            </div>
            <div className="box_astronaut">
              <img
                className="object_astronaut"
                src={require("./astronaut.svg")}
                width="140px"
              />
            </div>
          </div>
          <div className="glowing_stars">
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
          </div>
        </div>
      </div>
    );
  }
}
