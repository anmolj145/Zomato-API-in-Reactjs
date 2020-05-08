import React, { Component } from "react"
import axios from 'axios'

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { setErrorUrl, setCollectionId, setCity, setCityId, setShowSuggestion } from '../action/saveCart';

class Collection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collection_data: [],
            city_data: [],
            city: this.props.state.cart_item.city,
            city_id: this.props.state.cart_item.city_id,
            loader: true,
            open: false,
        }
    }

    componentDidMount() {
        const URL_COLLECTION = `https://developers.zomato.com/api/v2.1/collections?city_id=` + this.state.city_id
        axios.get(URL_COLLECTION, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({ loader: false, collection_data: response.data.collections })
            })
            .catch(error => {
                this.props.setErrorUrl(error.response.config.url)
                this.setState({ open: true })
            })
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

    onTextChange = (e) => {
        const value = e.target.value;
        const URL_COLLECTION = `https://developers.zomato.com/api/v2.1/cities?q=` + value
        axios.get(URL_COLLECTION, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({
                    loader: false,
                    city_data: response.data.location_suggestions,
                }, (() => (this.props.setShowSuggestion(true))))
            })
            .catch(error => {
                this.props.setErrorUrl(error.response.config.url)
                this.setState({ open: true })
            })
    }

    renderSuggestions() {
        if (this.props.state.cart_item.show_suggestion === true) {
            return (
                <div className="suggestion_item">
                    {this.state.city_data && this.state.city_data.map(cd => (
                        <h6 key={cd.id} onClick={() => this.selectSuggestion(cd.name, cd.id)}>{cd.name}</h6>
                    ))}
                </div >
            )
        }
    }

    selectSuggestion(city_name, city_id) {
        this.props.setCityId(city_id)
        this.props.setCity(city_name)
        this.props.setShowSuggestion(false)
        this.setState({ city: city_name })
        this.refs.input_city.value = "";
        const URL_COLLECTION = `https://developers.zomato.com/api/v2.1/collections?city_id=` + this.props.state.cart_item.city_id
        axios.get(URL_COLLECTION, { headers: { 'user-key': KEY } })
            .then(response => {
                this.setState({ loader: false, collection_data: response.data.collections })
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
                    </Dialog>
                </div>) :
                <div >
                    <input
                        type="text"
                        className="city-search-field ccf"
                        placeholder={this.props.state.cart_item.city}
                        ref="input_city"
                        onChange={(e) => this.onTextChange(e)}
                    />
                    <div> {this.renderSuggestions()} </div>
                    {this.state.collection_data && this.state.collection_data.map(cd => (
                        <div className="click-card" key={cd.collection.collection_id}>
                            <div className="sb" >
                                <img src={cd.collection.image_url} width="150px" height="150px" alt="img" />
                                <h5>{cd.collection.title}</h5>
                                <p className="excess-text">{cd.collection.description}</p>
                                <button
                                    type="button" className="btn btn-success"
                                    onClick={() => {
                                        this.props.setCollectionId(cd.collection.collection_id)
                                        this.props.history.push('/restaurant')
                                    }}>Explore</button>
                            </div>
                        </div>
                    ))
                    }
                </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, { setErrorUrl, setCollectionId, setCity, setCityId, setShowSuggestion })(Collection);