import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cart_icon from '../util/cart_icon.png';

class Header extends Component {
    render() {
        return (
            <div className="App-header">
                <Link to='/' className="logo"><b><i>Zomato</i></b></Link>
                <Link to='/cart'> <img className="city-name-display" src={cart_icon} width="50" height="30" alt="cart_symbol" /> </Link>
            </div>
        );
    }
}
export default Header;