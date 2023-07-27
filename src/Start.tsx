import { useState } from "react";
import "./styles.css";
/**
 * expense: boolean -- (true = asc, false = desc)
 * OR
 * expense: 'asc' | 'desc' -- string
 */
export default function Start() {
  const [formField, setFormField] = useState({
    expense: "",
    amount: 0,
    cat: "",
  });
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [sortBy, setSortBy] = useState({
    expense: "asc",
    amount: "asc",
    cat: "asc",
  });

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

  const handleSort = (key) => {
    // object -> keys -> values
    // example expense: 'asc' | 'desc'

    // if Array then use "s" at the end of the variable name to make it plural (good naming convention)
    // if single item then use singular variable name
    // example plural is sortedItems, singular is sortedItem
    // sortedItem is a single item, sortedItems is an array of items
    const sortedItems = [...list].sort((a, b) => {
      // use variable to store the value of the key
      // then swap the value of the key
      const valueX = sortBy[key] === "asc" ? a[key] : b[key]; // a[key] or b[key]
      const valueY = sortBy[key] === "asc" ? b[key] : a[key]; // b[key] or a[key]

      if (key === "amount") {
        // return a[key] - b[key]; // this is in ascending order
        // return b[key] - a[key]; // this is in descending order
        return valueX - valueY;
        // return a[key]==="asc" ?  a.amount - b.amount:b.amount-a.amount;
      } else {
        // a[key].localeCompare(b[key]) --> asc or desc ?
        // b[key].localeCompare(a[key]) --> desc or asc ?
        return valueX.localeCompare(valueY);
      }
    });
    setSortBy((prevState) => ({
      ...prevState,
      [key]: prevState[key] === "asc" ? "dsc" : "asc",
    }));
    setList(sortedItems);
  };

  return (
    <div className="container">
      <h1>Expense Tracker - Start</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("expense")}>Name</th>
            <th onClick={() => handleSort("amount")}>Amount</th>
            <th onClick={() => handleSort("cat")}>Category</th>
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
