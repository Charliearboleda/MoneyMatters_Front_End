import React, { Fragment } from "react"

const Login = ({setAuth}) => {
    return (
        <Fragment>
        <h1>Login</h1>
        <button onClick={()=> setAuth(true)}>login</button>
        </Fragment>
    )
}
export default Login
