import React from "react";

function TransactionTable({data, onCreate, onView, onEdit, onDelete}) {

    return (
      <div class="container">
        <table className = "table table-striped table-bordered mt-4">
          <thead className="table table-dark">
            <tr>
              <th>ID</th>
              <th>Account Holder</th>
              <th>Sort Code</th>
              <th>Account Number</th>
              <th>Account Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.account_holder}</td>
                <td>{item.sort_code}</td>
                <td>{item.account_number}</td>
                <td>£{item.balance}</td>
                <td>
                  <button className="btn btn-sml" onClick={() => onView(item)}>View</button>
                  <button className="btn btn-sml" onClick={() => onEdit(item)}>Edit</button>
                  <button className="btn btn-sml" onClick={() => onDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-sml" onClick={() => onCreate()}>Create new Account</button>
      </div>
    )
}

export default TransactionTable;