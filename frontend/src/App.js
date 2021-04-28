import './App.css';
import Homepage from './containers/Homepage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ProductListPage from "./containers/ProductListPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
