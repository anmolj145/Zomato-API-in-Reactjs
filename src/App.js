import React from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Collection from './components/Collection';
import Restaurant from './components/Restaurant';
import RestaurantDetail from './components/RestaurantDetail';
import Menu from './components/Menu';
import Footer from './components/Footer'
import Cart from './components/Cart';

import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Collection} />
            <Route path="/restaurant" exact component={Restaurant} />
            <Route path="/restaurantdetail" exact component={RestaurantDetail} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/cart" exact component={Cart} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;