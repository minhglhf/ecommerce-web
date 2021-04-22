import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute'
import React, { useEffect } from 'react'
import { isLoggedIn } from './actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {

    if (!auth.authenticate) dispatch(isLoggedIn())
  }, [])
  return (

    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
    </Switch>

  )
}

export default App;
