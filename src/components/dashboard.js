import React, { Fragment, useState, useEffect } from "react"

const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("")
    const [balance, setBalance] = useState("")

    async function getName() {

        try {
        const response = await fetch("https://moneymattersbackend.herokuapp.com/dashboard", {
            method:"GET",
            headers: {token: localStorage.token}
        })
        console.log(response)
        const parseResponse = await response.json()
        console.log(parseResponse)
        setName(parseResponse.user_name)

        } catch (err) {
            console.error(err.message)
        }
    }

    async function getBalance() {

        try {
        const response = await fetch("https://moneymattersbackend.herokuapp.com/dashboard", {
            method:"GET",
            headers: {token: localStorage.token}
        })
        console.log(response)
        const parseResponse = await response.json()
        console.log(parseResponse)
        setBalance(parseResponse.account_balance)

        } catch (err) {
            console.error(err.message)
        }
    }


useEffect(() => {
    getName()
    getBalance()
})


    return (
        <Fragment>
        <h1>Dashboard {name}</h1>
        <h2>balance ${balance}</h2>

        </Fragment>
    )
}
export default Dashboard
