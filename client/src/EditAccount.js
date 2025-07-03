import React, { useState, useEffect } from "react";
import { Modal, Button, Form}  from "react-bootstrap";

function EditAccount({ show, handleClose, account, handleSave }) {
  const [formData, setFormData] = useState(account || {});

  useEffect(() => {
    setFormData(account || {}); //whenever account changes, use the new account variable (account || {} checks if the account is truthy - not null or undefined)
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target; //this separates key and pair values from the input e.g. key: account_holder, value: mr lloyds
    setFormData(prev => ({ ...prev, [name]: value })); //updater function - spreads the previous key-pair values and replaces them with the new ones
  };

  const onSave = () => {
    handleSave(formData);
    handleClose();
  };

  if (!formData) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAccountHolder">
            <Form.Label>Account Holder</Form.Label>
            <Form.Control
              type="text"
              name="account_holder"
              value={formData.account_holder}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formSortCode">
            <Form.Label>Sort Code</Form.Label>
            <Form.Control
              type="text"
              name="sort_code"
              value={formData.sort_code}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formAccountNumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formToPay">
            <Form.Label>To Pay</Form.Label>
            <Form.Control
              type="number"
              name="pay"
              value={formData.pay}
              onChange={handleChange}
              defaultValue={0}
            />
          </Form.Group>

          <Form.Group controlId="formToReceive">
            <Form.Label>To Receive</Form.Label>
            <Form.Control
              type="number"
              name="receive"
              value={formData.receive}
              onChange={handleChange}
              defaultValue={0}
            />
          </Form.Group>
        </Form>
      </Modal.Body>  

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditAccount;