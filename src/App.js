
import './App.css';
import React,{ Fragment, useState, useEffect } from "react"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Dashboard from "./components/dashboard"
import Login from "./components/login"
import Register from "./components/register"




function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const setAuth = (boolean) => {
        setIsAuthenticated(boolean)
    }

    async function isAuth() {
        try {
            const response = await fetch("https://sharp-torvalds-d6526b.netlify.app/auth/is-verify", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const parseResponse = await response.json()
            parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
        } catch (err) {
        console.error(err.message)
        }
    }

    useEffect(() => {
        isAuth()
    })

  return (
    <Fragment>
        <Router>
            <div className="container">
                <Switch>
                    <Route exact path="/login" render={props => !isAuthenticated ?  <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />}/>
                    <Route exact path="/register" render={props => !isAuthenticated? <Register {...props} setAuth={setAuth} /> : <Redirect to="/login" />}/>
                    <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />}/>
                </Switch>
                </div>
        </Router>
    </Fragment>
  );
}


export default App;
