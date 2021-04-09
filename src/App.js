import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import Dashboard  from './Dashboard';
import  Login  from './Login';


function App() {
  return (
        <div>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
        </div>
  );
}

export default App;
