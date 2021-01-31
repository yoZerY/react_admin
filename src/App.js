
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './views/login/index.js'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route component={Login} path='/'></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
