import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';
//import Layout from './Components/Layout/Layout';
import { Route,Switch } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import ProductForm from './Components/Dashboard/ProductForm/ProductForm'
import ProfilesV2 from './Components/Dashboard/ProfilesV2/ProfilesV2';
//import axios from 'axios';


class App extends Component {

    
  render() {
      //console.log(this.props);
    return (
        <div className="App">
            <div className="Site-content">
                <main>{this.props.children}</main>
            </div> 
            <Switch>
                
                <Route 
                    path="/home" 
                    component={Home} 
                />
                <Route 
                    path="/login" 
                    component={Login} 
                />
                <Route 
                    path="/signup" 
                    component={Signup} 
                />
                <Route 
                    path="/dashboard" 
                    component={Dashboard} 
                /> 
                <Route
                    path="/ProfilesV2"
                    component={ProfilesV2}
                />
                <Route 
                    exact 
                    path="/" 
                    component={Home} 
                />
                </Switch>
                
            
            <Footer />
        </div>
    );
  }
}

export default App;
