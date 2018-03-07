/**
 * Header that appears on top of each page.
 */
import React, {Component} from 'react';
import '../css/Header.css';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <div className="header">
          <div className="title">
            <Link to="/home">
              Kupongo
            </Link>
          </div>

          <div className="nav-links">
            <div className="link">
              <Link to="/pin">
                Pin Coupons
              </Link>
            </div>

            <div className="link">
              <Link to="/view">
                View Pinned Coupons
              </Link>
            </div>

          </div>
        </div>
    );
  }
}

export default Header;
