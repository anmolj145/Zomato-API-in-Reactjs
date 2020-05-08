import React, { Component } from 'react'
import axios from 'axios'

import { connect } from 'react-redux';
import { setErrorUrl, setRestaurantId, setRestaurantName } from '../action/saveCart';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant_data: [],
            loader: true,
            open: false
        }
    }

    hideErrorMessage = () => {
        this.setState({ open: false })
        axios.get(this.props.state.cart_item.error_url, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({ loader: false, restaurant_data: response.data.restaurants })
            })
            .catch(error => {
                this.props.setErrorUrl(error.response.config.url)
                this.setState({ open: true })
            })
    };

    componentDidMount() {
        const URL_COLLECTION_CITY = `https://developers.zomato.com/api/v2.1/search?entity_id=` + this.props.state.cart_item.city_id + '&entity_type=city&collection_id=' + this.props.state.cart_item.collection_id
        axios.get(URL_COLLECTION_CITY, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({ loader: false, restaurant_data: response.data.restaurants })
            })
            .catch(error => {
                this.props.setErrorUrl(error.response.config.url)
                this.setState({ open: true })
            })
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
                <div>
                    {this.state.restaurant_data && this.state.restaurant_data.map(rd => (
                        <div className="click-card" key={rd.restaurant.R.res_id}>
                            <div className="sb" >
                                <img src={rd.restaurant.thumb} width="200px" height="200px" alt="img" />
                                <h5>{rd.restaurant.name}</h5>
                                <h5>&#9733; &nbsp;{rd.restaurant.user_rating.aggregate_rating}</h5>
                                <button
                                    type="button" className="btn btn-success"
                                    onClick={() => {
                                        this.props.setRestaurantId(rd.restaurant.id)
                                        this.props.setRestaurantName(rd.restaurant.name)
                                        this.props.history.push('/restaurantdetail')
                                    }}>Review and Photos</button>
                            </div>
                        </div>
                    ))}
                </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, { setErrorUrl, setRestaurantId, setRestaurantName })(Restaurant);