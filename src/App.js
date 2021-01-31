
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './views/login/index.js'
import Register from './views/register/index.js'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route component={Login} path='/login'></Route>
          <Route component={Register} path='/register'></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
