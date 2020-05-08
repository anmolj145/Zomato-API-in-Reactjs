import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, removeCartItem, updateCartValue, updateItemQuantity } from '../action/saveCart';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';

import empty_cart_icon from '../util/empty-cart-icon.png';

import { Link } from 'react-router-dom';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            remove_item_popup: false,
            remove_item_index: null,
            remove_item_confirmation_popup: false,
            edit_quantity: false,
            item_to_update: 0
        }
    }

    UNSAFE_componentWillMount() {
        this.props.fetchCart();
    }

    removeItemDialog = (i) => {
        this.setState({ remove_item_index: i, remove_item_popup: true })
    }

    handleClose = () => {
        this.setState({ remove_item_popup: false })
    }
    handleConfirmationClose = () => {
        this.setState({ remove_item_confirmation_popup: false })
    }

    handleRemove = () => {
        this.props.updateCartValue(this.state.remove_item_index)
        this.props.removeCartItem(this.state.remove_item_index)
        this.setState({ remove_item_popup: false, remove_item_confirmation_popup: true })
    }

    editCart = (i) => {
        this.setState({ edit_quantity: true, item_to_update: i })
    }

    updateQuantity = () => {
        this.props.updateItemQuantity(this.state.item_to_update, document.getElementById("update_quantity").value)
        this.setState({ edit_quantity: false })
    }

    render() {
        if (this.props.state.cart_item.cart_amount !== 0)
            return (
                <div>
                    <div className="cart">
                        <h1>Cart</h1>
                        {this.props.state.cart_item.items[0] && this.props.state.cart_item.items[0].map((cc, index) => (
                            < div key={cc.item_name} >
                                <h5>{cc.item_name}</h5>
                                <h5 className="cart-item-price">&#8377;{cc.item_price} </h5>
                                <h5 className="cart-item-price"> &times;{cc.item_quantity} </h5>
                                <h5 className="cart-item-total-price"> {cc.item_price * cc.item_quantity} </h5>
                                <button
                                    type="submit"
                                    className="cart-item-total-price remove-button"
                                    onClick={this.editCart.bind(this, index)}>
                                    Edit
                                </button>

                                <button
                                    type="submit"
                                    className="cart-item-total-price remove-button"
                                    onClick={this.removeItemDialog.bind(this, index)}>
                                    Remove
                                </button>
                            </div>
                        ))
                        }
                        <h3>Total :<b className="cart-total">{this.props.state.cart_item.cart_amount}</b> </h3>
                    </div >

                    {this.state.remove_item_confirmation_popup === true ?
                        <div>
                            <Dialog
                                open={this.state.remove_item_confirmation_popup}
                                onClose={this.handleConfirmationClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Cart"}</DialogTitle>
                                <DialogContent>
                                    <div>
                                        <p>Item Removed Successfully</p>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleConfirmationClose} color="primary">
                                        Ok
                            </Button>
                                </DialogActions>
                            </Dialog>
                        </div> : null}

                    {this.state.remove_item_popup === true ?
                        <div>
                            <Dialog
                                open={this.state.remove_item_popup}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Cart"}</DialogTitle>
                                <DialogContent>
                                    <div>
                                        <p>Sure to remove
                                         <b> {this.props.state.cart_item.items[0][this.state.remove_item_index].item_name}</b>
                                            ?</p>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                            </Button>
                                    <Button onClick={this.handleRemove} color="primary">
                                        Confirm
                            </Button>
                                </DialogActions>
                            </Dialog>
                        </div> : null}

                    {this.state.edit_quantity === true ? (
                        <Dialog
                            open={this.state.edit_quantity}
                            onClose={this.handleEditQuantityClose}
                            aria-labelledby="form-dialog-title">
                            <DialogContent>
                                <DialogContentText>
                                    Enter Quantity
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="update_quantity"
                                    label="Quantity"
                                    type="number"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.updateQuantity} color="primary">
                                    Update Cart
                                </Button>
                            </DialogActions>
                        </Dialog>
                    ) : null}
                </div>
            );
        else
            return (
                <div className="empty-cart">
                    <h4 className="empty-cart-title">  <b> My Cart </b> </h4>
                    <img
                        className="empty-cart-icon"
                        src={empty_cart_icon}
                        width="400"
                        height="292"
                        alt="cart_symbol" />
                    <p className="empty-cart-explore-text">Explore our menu</p>
                    <Link to='/'>  <input type="button" className="empty-cart-button" value="Explore"></input> </Link>
                </div>
            );
    }
}

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, { fetchCart, removeCartItem, updateCartValue, updateItemQuantity })(Cart);