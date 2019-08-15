import React, { Component } from 'react'

export class AllBudgets extends Component {
    render() {
        console.log(this.props)
        const {budget_id,budget_name,budget_balance} = this.props
        return (
            <div>
            {/* <h1>{budget_id}</h1> */}
           <h1>{budget_name}</h1>
           <h1>{budget_balance}</h1>
            </div>
        )
    }
}

export default AllBudgets
