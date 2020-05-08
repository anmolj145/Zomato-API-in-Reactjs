import React, { Component } from 'react'
import axios from 'axios'
import Review from './Review'
import Photo from './Photo'

import { connect } from 'react-redux';
import { setErrorUrl, setRestaurantName } from '../action/saveCart';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Menu from './Menu'

class RestaurantDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurant_image: '',
            restaurant_title: this.props.state.cart_item.restaurant_name,
            restaurant_id: this.props.state.cart_item.restaurant_id,
            restaurant_rating: '',
            loader: true,
            open: false,
            menu: true,
            review: false,
            photo: false
        }
    }

    hideErrorMessage = () => {
        this.setState({ open: false })
        axios.get(this.props.state.cart_item.error_url, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({ loader: false, collection_data: response.data.collections })
            })
            .catch(error => {
                this.props.setErrorUrl(error.response.config.url)
                this.setState({ open: true })
            })
    };

    componentDidMount() {
        const URL_COLLECTION_CITY = `https://developers.zomato.com/api/v2.1/restaurant?res_id=` + this.props.state.cart_item.restaurant_id || this.state.restaurant_id
        axios.get(URL_COLLECTION_CITY, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({
                    loader: false,
                    restaurant_image: response.data.thumb,
                    restaurant_title: response.data.name,
                    restaurant_rating: response.data.user_rating.aggregate_rating
                })
            })
            .catch(error => {
                this.props.setErrorUrl(error.response.config.url)
                this.setState({ open: true })
            })
    }

    getReview = () => {
        this.setState({ menu: false, review: true, photo: false })
    }

    getPhoto = () => {
        this.setState({ menu: false, review: false, photo: true })
    }

    getMenu = () => {
        this.setState({ menu: true, review: false, photo: false })
    }

    render() {
        return (
            this.state.loader === true ? (this.state.open === false ? <div className="loader">Loading . . .</div> :
                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <h3>Sorry Unable to connect to server .<span role="img" aria-label="sad"> &#128577;</span></h3>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.hideErrorMessage} color="primary">
                                Retry
                            </Button>
                        </DialogActions>
                    </Dialog></div>) :
                <div key={
                    this.props.state.cart_item.restaurant_id
                }>
                    <h2 className="align-mt">{this.state.restaurant_title}<span className="span-class"> &nbsp; &#9733; {this.state.restaurant_rating}</span></h2>
                    < img className="align-mb" src={this.state.restaurant_image} alt="img" /> <br />
                    <button
                        className="btn btn-success align-mb"
                        onClick={() => {
                            this.props.setRestaurantName(this.state.restaurant_title)
                            this.props.history.push('/menu')
                        }}>Menu</button>
                    <div className="tab">
                        <button
                            onClick={this.getMenu}>Order Online</button>
                        <button
                            onClick={this.getReview}>Review</button>
                        <button
                            onClick={this.getPhoto}>Photos</button>
                    </div>
                    {this.state.menu === true ? <Menu {...this.props} /> : null}
                    {this.state.review === true ? <Review /> : null}
                    {this.state.photo === true ? <Photo /> : null}
                </div >
        );
    }
}

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, { setErrorUrl, setRestaurantName })(RestaurantDetail);