import React, { Component } from "react";
import { Container } from "./DashboardStyle";
export class OneBudget extends Component {
  render() {
    console.log(this.props);
    const { keys, handleChange } = this.props;
    return (
      <div>
        <h1>{keys.rent_or_mortgage}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="rent_or_mortgage"
          defaultValue={keys.rent_or_mortgage}
        />
        <h1>{`Electric  $${keys.electric}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="electric"
          defaultValue={keys.electric}
        />
        <h1>{`Internet  $${keys.internet}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="internet"
          defaultValue={keys.internet}
        />
        <h1>{`Groceries  $${keys.groceries}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="groceries"
          defaultValue={keys.groceries}
        />
        <h1>{`Transportation  $${keys.transportation}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="transportation"
          defaultValue={keys.transportation}
        />
        <h1>{`auto_maintenance  $${keys.auto_maintenance}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="auto_maintenance"
          defaultValue={keys.auto_maintenance}
        />
        <h1>{`house_maintenance  $${keys.house_maintenance}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="house_maintenance"
          defaultValue={keys.house_maintenance}
        />
        <h1>{`Medical  $${keys.medical}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="medical"
          defaultValue={keys.medical}
        />
        <h1>{`Clothing  $${keys.clothing}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="clothing"
          defaultValue={keys.clothing}
        />
        <h1>{`gifts  $${keys.gifts}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="gifts"
          defaultValue={keys.gifts}
        />
        <h1>{`Computer_Replacement  $${keys.computer_replacement}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="computer_replacement"
          defaultValue={keys.computer_replacement}
        />
        <h1>{`Student Loan  $${keys.student_loan}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="student_loan"
          defaultValue={keys.student_loan}
        />
        <h1>{`auto_loan  $${keys.auto_loan}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="auto_loan"
          defaultValue={keys.auto_loan}
        />
        <h1>{`Vacation  $${keys.vacation}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="vacation"
          defaultValue={keys.vacation}
        />
        <h1>{`Fitness  $${keys.fitness}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="fitness"
          defaultValue={keys.fitness}
        />
        <h1>{`Education  $${keys.education}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="education"
          defaultValue={keys.education}
        />
        <h1>{`Dining Out  $${keys.dining_out}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="dining_out"
          defaultValue={keys.dining_out}
        />
        <h1>{`gaming  $${keys.gaming}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="gaming"
          defaultValue={keys.gaming}
        />
        <h1>{`Fun Money  $${keys.fun_money}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="fun_money"
          defaultValue={keys.fun_money}
        />
        <h1>{`Date  $${keys.dates}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="dates"
          defaultValue={keys.dates}
        />
        <h1>{`Electric  $${keys.electric}`}</h1>
        <input
          onChange={e => handleChange(e)}
          type="number"
          name="electric"
          defaultValue={keys.electric}
        />
      </div>
    );
  }
}

export default OneBudget;
