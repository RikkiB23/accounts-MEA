import React, {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";

function CreateAccount ({show, handleClose, onAccountCreated}) {
    const [formData, setFormData] = useState({ //initialise empty attributes
        account_holder: "",
        sort_code: "",
        account_number: "",
        balance: "",
        pay: 0,
        receive: 0
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/accounts", {
                ...formData,
                balance: parseFloat(formData.balance), //in the front end, the form always treats the inputs as string
                pay: 0,
                receive: 0
            });
            onAccountCreated(response.data);
            handleClose();
        } catch (error) {
            alert("Error creating account" + error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="accountHolder">
              <Form.Label>Account Holder</Form.Label>
              <Form.Control
                type="text"
                name="account_holder"
                value={formData.account_holder}
                onChange={handleChange}
              />
              </Form.Group>
            <Form.Group controlId="sortCode">
              <Form.Label>Sort Code</Form.Label>
              <Form.Control
                type="text"
                name="sort_code"
                value={formData.sort_code}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="accountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                name="account_number"
                value={formData.account_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="balance">
              <Form.Label>Starting Balance</Form.Label>
              <Form.Control
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Create</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default CreateAccount;