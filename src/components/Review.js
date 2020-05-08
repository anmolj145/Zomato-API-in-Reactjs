import React, { Component } from 'react'
import axios from 'axios'

import { connect } from 'react-redux';
import { setErrorUrl } from '../action/saveCart';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class Review extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurant_review: [],
            restaurant_review_count: '',
            loader: true,
            open: false
        }
    }

    hideErrorMessage = () => {
        this.setState({ open: false })
        axios.get(this.props.state.cart_item.error_url, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({
                    loader: false,
                    collection_data: response.data.collections
                })
            })
            .catch(error => {
                this.props.setErrorUrl(error.response.config.url)
                this.setState({ open: true })
            })
    };

    componentDidMount() {
        const URL_RESTAURANT_REVIEW = `https://developers.zomato.com/api/v2.1/reviews?res_id=` + this.props.state.cart_item.restaurant_id
        axios.get(URL_RESTAURANT_REVIEW, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({
                    loader: false,
                    restaurant_review: response.data.user_reviews,
                    restaurant_review_count: response.data.reviews_shown
                })
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
                    <h5 className="title_count" >Reviews({this.state.restaurant_review_count})</h5>
                    {this.state.restaurant_review && this.state.restaurant_review.map(r => (
                        <div className="sb-review" key={r.review.id} >
                            <img className="profile-image" src={r.review.user.profile_image} width="50px" height="50px" alt="img" />
                            <h5>{r.review.user.name}</h5>
                            <h5>&#9733; {r.review.rating}</h5>
                            <p>{r.review.review_text}</p>
                        </div>
                    ))}
                </div>
        )
    }
}

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, { setErrorUrl })(Review);