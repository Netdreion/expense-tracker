import { useState } from "react";
import "./styles.css";

export default function Start() {
  const [formField, setFormField] = useState({
    expense: "",
    amount: 0,
    cat: "",
  });
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(-1);

  const handleChange = (event) => {
    const updatedValue = event.target.value;
    const formFieldKey = event.target.name;

    setFormField({ ...formField, [formFieldKey]: updatedValue });
  };

  const handleClick = () => {
    if (edit === -1) {
      setList([...list, formField]);
    } else {
      const newList = [...list];
      newList[edit] = formField;
      setList(newList);
      setEdit(-1);
    }
    setFormField({ expense: "", amount: 0, cat: "" });
  };

  const handleEdit = (index) => {
    setEdit(index);
    const selectedItem = list[index];
    setFormField({
      expense: selectedItem.expense,
      amount: selectedItem.amount,
      cat: selectedItem.cat,
    });
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
        <tbody>
          {list.map((item, index) => {
            return (
              <tr onClick={() => handleEdit(index)} key={index}>
                <td>{item.expense}</td>
                <td>{item.amount}</td>
                <td>{item.cat}</td>
              </tr>
            );
          })}
        </tbody>
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
                value={formField.expense}
              />
            </label>
            <label>
              Amount
              <input
                onChange={handleChange}
                type="text"
                placeholder="$100"
                name="amount"
                value={formField.amount}
              />
            </label>
            <label>
              Category
              <input
                onChange={handleChange}
                type="text"
                placeholder="food"
                name="cat"
                value={formField.cat}
              />
            </label>
          </fieldset>
          <button type="button" onClick={handleClick}>
            {edit === -1 ? "add" : "edit"}
          </button>
        </form>
      </div>
    </div>
  );
}
