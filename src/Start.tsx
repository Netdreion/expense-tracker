import { useState } from "react";
import "./styles.css";

export default function Start() {
  const [formField, setFormField] = useState({
    expense: "",
    amount: 0,
    cat: "",
  });
  const [list, SetList] = useState([]);

  const handleChange = (event) => {
    const updatedValue = event.target.value;
    const formFieldKey = event.target.name;

    setFormField({ ...formField, [formFieldKey]: updatedValue });
  };

  return (
    <div className="container">
      <h1>Expense Tracker - Start</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div className="form-container">
        <form>
          <fieldset>
            <legend>Add / Edit Item</legend>
            <label>
              Name
              <input
                onChange={handleChange}
                type="text"
                placeholder="name"
                name="expense"
              />
            </label>
            <label>
              Amount
              <input
                onChange={handleChange}
                type="text"
                placeholder="$100"
                name="amount"
              />
            </label>
            <label>
              Category
              <input
                onChange={handleChange}
                type="text"
                placeholder="food"
                name="cat"
              />
            </label>
          </fieldset>
          <button></button>
        </form>
      </div>
    </div>
  );
}
