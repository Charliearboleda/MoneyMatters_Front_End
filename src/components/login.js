import React, { Fragment, useState } from "react"
import { Link } from 'react-router-dom'

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        user_email: "",
        user_password: ""
    })
    const {user_email, user_password} = inputs

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value })
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            const body = {user_email, user_password}
            const response = await fetch("https://money-managment-nyc.herokuapp.com/auth/login", {
                method:"POST",
                headers: {"Content-Type" : "application/json"}
                ,
                body: JSON.stringify(body)
            })
            const parseResponse = await response.json()
            localStorage.setItem("token", parseResponse.token)
            setAuth(true)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
        <h1 className="text-center my-5">Login</h1>
        <form onSubmit={onSubmitForm}>
            <label htmlFor="user_email">Email</label>
                <input type="email" name="user_email" className="form-control my-3" value={user_email} onChange={e => onChange(e)} />
            <label htmlFor="user_password">Password</label>
                <input type="password" name="user_password" className="form-control my-3" value={user_password} onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Log In</button>
        </form>
        <Link to="/register">Sign Up</Link>
        </Fragment>
    )
}
export default Login
