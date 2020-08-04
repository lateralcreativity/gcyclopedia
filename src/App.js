import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import GameDetails from './components/GameDetails';
import ScrollToTop from './components/ScrollToTop';

const container = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

function App() {
  return (
    <div style={container}>
      <div className="hereForFlex">
      <Router>
        <Navbar />
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/games/:id' component={GameDetails} />
            <Redirect to="/" />
          </Switch>
        </ScrollToTop>
      </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
