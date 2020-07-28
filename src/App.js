import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

const container = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

function App() {
  return (
    <div style={container}>
      <div>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
