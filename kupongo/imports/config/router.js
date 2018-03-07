/**
 * Handles routing on the website.
 */
import React from 'react';
import PinCoupon from '../pages/PinCoupon';
import PinnedCoupons from '../pages/PinnedCoupons';
import LandingPage from '../pages/LandingPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import {BrowserRouter, Route} from 'react-router-dom';


export const routes = (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Dashboard}/>
        <Route path="/view" component={PinnedCoupons}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/pin" component={PinCoupon}/>
      </div>
    </BrowserRouter>
);
