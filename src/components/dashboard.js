import React, { Fragment, useState, useEffect } from "react"

const Dashboard = ({setAuth}) => {

    // const [inputs, setInputs] = useState({
    //     account_balance: "",
    // })
    //
    // const [name, setName] = useState("")
    // const [balance, setBalance] = useState("")
    const [currentUser, setCurrentUser] = useState({
        user_id: "",
        user_name: "",
        user_email: "",
        user_password: "",
        account_balance: ""
    })

    const [formInfo, setFormInfo] = useState({
        user_id: "",
        user_name: "",
        user_email: "",
        user_password: "",
        account_balance: ""
    })

    async function getUser() {
        try {
        const response = await fetch("https://moneymattersbackend.herokuapp.com/dashboard", {
            method:"GET",
            headers: {token: localStorage.token}
        })

        const parseResponse = await response.json()
        setCurrentUser(parseResponse)
        setFormInfo(parseResponse)
        // setName(parseResponse.user_name)
        // setBalance(parseResponse.account_balance)
        } catch (err) {
            console.error(err.message)
        }
    }

const updateBalance = async(e) => {
    e.preventDefault()
        window.location.reload(false)
    try {
        await setFormInfo({
            ...formInfo,
            account_balance: parseInt(currentUser.account_balance)
        })
        const id = currentUser.user_id

        console.log(JSON.stringify(formInfo))
        const response = await fetch(`https://money-managment-nyc.herokuapp.com/auth/${id}`, {
            method: "PUT",
            headers: {token: localStorage.token,"Content-Type" : "application/json"},
            body:JSON.stringify(formInfo)

        })
    } catch (err) {
    console.error(err.message)
    }
}

const handleChange = (e) => {
    setFormInfo({
        ...formInfo,
        [e.target.name]: e.target.value
    })
}

const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
}

useEffect(() => {
    getUser()

},[])


    return (
        <Fragment>
        <div className="button">
        <button className="btn btn-primary " onClick={logout}>Log Out</button>
        </div>
        <div className="header">
        <h1>Welcome, {currentUser.user_name}</h1>
        </div>


        <div className="account">


        <h3>Your Account Balance Is ${currentUser.account_balance}</h3>

        <form onSubmit={updateBalance} name={currentUser.user_id}>
        <input type="number" name="account_balance"  onChange={handleChange} />
        <input className="submit"type="submit" onClick={updateBalance} />

        </form>
        </div>

        </Fragment>
    )
}
export default Dashboard
