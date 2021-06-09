import React, { Fragment, useState } from "react"

const Register = () => {

    const [inputs, setInputs] = useState({
        user_name: "",
        user_email: "",
        user_password: "",
        account_balance: ""
    })

    const { user_name, user_email, user_password, account_balance } = inputs

  const onChange = e => {
      setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const onSubmitForm = async(e) => {
      e.preventDefault()
      try {
          const body = {user_name, user_email, user_password, account_balance }

          const response = await fetch("https://moneymattersbackend.herokuapp.com/auth/register", {
              method: "POST",
              headers:{"Content-Type" : "application/json"}
              ,
              body: JSON.stringify(body)

          })

          const parseResponse = await response.json()
          localStorage.setItem("token", parseResponse)
      } catch (err) {
            console.error(err.message)
      }
  }

    return (
        <Fragment>
        <h1 className="text-center my-5">Register</h1>
        <form onSubmit={onSubmitForm}>

                <label htmlFor="userName">User Name </label>
                    <input type="text" name="user_name" placeholder="name" className="form-control my-3" value={user_name} onChange={e => onChange(e)}/>

                <label htmlFor="email">Email </label>
                    <input type="email" name="user_email" placeholder="email" className="form-control my-3" value={user_email} onChange= {e => onChange(e)} />

                <label htmlFor="password">Password </label>
                    <input type="password" name="user_password" placeholder="password" className="form-control my-3" value={user_password} onChange= {e => onChange(e)}/>

                <label htmlFor="accountBalance">Account Balance $ </label>
                    <input type="text" name="account_balance" placeholder="balance" className="form-control my-3" value={account_balance} onChange= {e => onChange(e)} />

        <button className="btn btn-success btn-block">Submit</button>
        </form>
        </Fragment>
    )
}
export default Register
