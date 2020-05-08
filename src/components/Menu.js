import React, { Component } from 'react'
import jsonData from "./menu_data.json";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { createCart, getCartValue } from '../action/saveCart';

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: jsonData.menu,
            quantity: [],
            open: false,
            cart_value: 0,
            cart: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    showCart = () => {
        this.setState({ open: true })
    }

    setQuantity = () => {
        var updatedArray = []
        for (let i = 0; i < 6; i++) {
            var input = document.getElementById(i + 1).value
            updatedArray.push(input);
        }
        this.setState({
            quantity: updatedArray
        }, () => {
            this.showCart();
            this.getTotal();
        });
    }

    handleClose = () => {
        this.setState({ open: false })
    };

    handlePay = () => {
        this.setState({ open: false })
        this.setCartItem();
        this.props.history.push('/cart')
    };

    getTotal = () => {
        var total = 0;
        for (let j = 0; j < 6; j++) {
            total = total + this.state.data[j].price * this.state.quantity[j]
        }
        return (
            this.setState({ cart_value: total })
        )
    }

    setCartItem = () => {
        for (let j = 0; j < 6; j++) {
            if (this.state.quantity[j] > 0) {
                let cart_item = {
                    item_name: this.state.data[j].name,
                    item_price: this.state.data[j].price,
                    item_quantity: this.state.quantity[j]
                };
                this.state.cart.push(cart_item)
            }
        }
        this.props.createCart(this.state.cart)
        this.props.getCartValue(this.state.cart_value)
    }

    getValidCartItem = (k) => {
        if (this.state.quantity[k - 1] > 0) {
            return true;
        }
        else
            return false;
    }

    handleChange = (e) => {
        var temp = []
        temp = { ...this.state.quantity }
        temp[e.target.id - 1] = e.target.value
        this.setState({
            quantity: temp
        });
    }

    render() {
        return (
            <div>
                <div className=" menu static-menu">
                    <h3 className="name">{localStorage.getItem('restaurant_name')}</h3>
                    {this.state.data && this.state.data.map(d => (
                        <div className="menu-item" key={d.id}>
                            <h5>{d.name}</h5>
                            <h5 className="amount" > &#8377;&nbsp;{d.price}</h5>
                            <div className="subtotal-item" >
                                <input
                                    onChange={this.handleChange}
                                    id={d.id}
                                    defaultValue="0"
                                    type="number"
                                    min="0"
                                    max="10"
                                />
                                &nbsp;</div>
                        </div>
                    ))
                    }
                    <button
                        type="button"
                        className="btn btn-success checkout-button"
                        onClick={this.setQuantity}
                    > Checkout</button>

                    {this.state.open === true ?
                        <div>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Cart"}</DialogTitle>
                                <DialogContent>
                                    <div>
                                        {this.state.data && this.state.data.map(qn => (
                                            this.getValidCartItem(qn.id) ?
                                                < div className="dialog-body" key={qn.id} >
                                                    <h5>{qn.name}</h5>
                                                    <h5 className="item-price">&#8377;{qn.price} </h5>
                                                    <h5 className="item-price"> &times;{this.state.quantity[qn.id - 1]} </h5>
                                                    <h5 className="total-price"> {qn.price * this.state.quantity[qn.id - 1]} </h5>
                                                </div> : null
                                        ))
                                        }
                                        <h3>Total :<b className="total">{this.state.cart_value}</b> </h3>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                            </Button>
                                    <Button onClick={this.handlePay} color="primary">
                                        Confirm
                            </Button>
                                </DialogActions>
                            </Dialog>
                        </div> : null}
                </div >
                <div className="menu dynamic-menu">
                    <h4>Your Cart</h4>
                    {this.props.cart_content.items.length !== 0 ?
                        (<div>
                            {this.props.cart_content.items[0] && this.props.cart_content.items[0].map(qn => (
                                < div key={qn.item_name} >
                                    <h5>{qn.item_name}</h5>
                                    <h5 className="item-price">&#8377;{qn.item_price} </h5>
                                    <h5 className="item-price"> &times;{qn.item_quantity} </h5>
                                    <h5 className="total-price"> {qn.item_price * qn.item_quantity} </h5>
                                </div>
                            ))
                            }
                        </div>)
                        :
                        (<div>
                            {this.state.data && this.state.data.map(qn => (
                                this.getValidCartItem(qn.id) ?
                                    < div key={qn.id} >
                                        <h5>{qn.name}</h5>
                                        <h5 className="item-price">&#8377;{qn.price} </h5>
                                        <h5 className="item-price"> &times;{this.state.quantity[qn.id - 1]} </h5>
                                        <h5 className="total-price"> {qn.price * this.state.quantity[qn.id - 1]} </h5>
                                    </div>
                                    : null
                            ))
                            }
                        </div>)
                    }
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    cart_content: state.cart_item
});

export default connect(mapStateToProps, { createCart, getCartValue })(Menu);