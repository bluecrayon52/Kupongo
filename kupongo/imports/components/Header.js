/**
 * Header that appears on top of each page.
 */
import React, {Component} from 'react';
import '../css/Header.css';
import {Link} from 'react-router-dom';
import { Session } from 'meteor/session';

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

            <div className="link">
              <button className="logout" onClick={this.handleLogoutButton.bind(this)}>
                Logout
              </button>
            </div>

          </div>
        </div>
    );
  }

  handleLogoutButton(event) {
    event.preventDefault();

    Session.set('isAuthorized', false);
    this.props.history.push('/');
  }
}

export default Header;
