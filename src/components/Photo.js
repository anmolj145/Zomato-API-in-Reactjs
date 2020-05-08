import React, { Component } from 'react'
import axios from 'axios'

import { connect } from 'react-redux';
import { setErrorUrl } from '../action/saveCart';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class Photo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurant_photos: [],
            restaurant_photo_count: '',
            loader: true,
            open: false
        }
    }

    hideErrorMessage = () => {
        this.setState({ open: false })
        axios.get(
            this.props.state.cart_item.error_url
            , { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({ loader: false })
                this.setState({ collection_data: response.data.collections })
            })
            .catch(error => {
                this.props.setErrorUrl(error.response.config.url)
                this.setState({ open: true })
            })
    };

    componentDidMount() {
        const URL_RESTAURANT_IMAGE = `https://developers.zomato.com/api/v2.1/restaurant?res_id=` +
            this.props.state.cart_item.restaurant_id
        axios.get(URL_RESTAURANT_IMAGE, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({ loader: false, restaurant_photos: response.data.photos, restaurant_photo_count: response.data.photos.length })
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
                    <h5 className="title_count" >Photos({this.state.restaurant_photo_count})</h5>
                    {this.state.restaurant_photos && this.state.restaurant_photos.map(r => (
                        <div className="photo" key={r.photo.id}>
                            <img src={r.photo.url} width="200px" height="200px" alt="img" />
                        </div>
                    ))}
                </div>
        )
    }
}
const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, { setErrorUrl })(Photo);