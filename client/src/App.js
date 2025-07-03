import React from "react";
import axios from "axios";
import './App.css';
import TransactionTable from "./TransactionTable.js";
import EditAccount from "./EditAccount.js";
import ViewAccount from "./ViewAccount.js";
import CreateAccount from "./CreateAccount.js";

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showViewModal, setShowViewModal] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState(null);
  const [showCreateNewModal, setShowCreateNewModal] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/accounts');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreate = () => {
    setShowCreateNewModal(true);
  }

  const handleView = (account) => {
    setSelectedAccount(account);
    setShowViewModal(true);
  }

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setShowEditModal(true);
  }

  const handleAccountCreated = (newAccount) => {
    setData(prev => [...prev, newAccount]);
  }

  const handleSaveEdit = async (updatedAccount) => {
    try {
      await axios.put(`http://localhost:3000/accounts/${updatedAccount.id}`, updatedAccount);
      setData(prev =>
        prev.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc)
      );
    } catch (err) {
      alert("Unable to update account: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    try {
      await axios.delete(`http://localhost:3000/accounts/${id}`);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert("Error deleting account: " + err.message);
    }
  };



  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="App">
      <h1 className="container ">List of recent transactions</h1>
      <TransactionTable 
        data = {data}
        onCreate={handleCreate}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditAccount
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        account={selectedAccount}
        handleSave={handleSaveEdit}
      />
      <ViewAccount
        show={showViewModal}
        handleClose={() => setShowViewModal(false)}
        account={selectedAccount}
      />
      <CreateAccount
        show={showCreateNewModal}
        handleClose={() => setShowCreateNewModal(false)}
        onAccountCreated={handleAccountCreated}
      />
    </div>
  );
}

export default App;
