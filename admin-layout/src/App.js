import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute'
import React, { useEffect } from 'react'
import { isLoggedIn } from './actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import Products from './containers/Products';
import Orders from './containers/Orders';
import Categories from './containers/Categories';

import {  fetchCategories } from './actions/category.actions';
import { fetchProducts } from './actions/product.actions';
import { fetchDatas } from './actions';
const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {

    if (!auth.authenticate) dispatch(isLoggedIn())

    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [])
  return (

    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/products" component={Products} />
      <PrivateRoute path="/orders" component={Orders} />
      <PrivateRoute path="/categories" component={Categories} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
    </Switch>

  )
}

export default App;
