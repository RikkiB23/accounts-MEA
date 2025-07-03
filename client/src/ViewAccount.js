import React, { useState, useEffect } from "react";
import { Modal, Button, Form}  from "react-bootstrap";

function ViewAccount({ show, handleClose, account}) {
    const [formData, setFormData] = useState(account || {});

    useEffect(() => {
      setFormData(account || {});
    }, [account]);

    if (!formData) return null;

    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Account: {formData.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formAccountHolder">
                <Form.Label>Account Holder</Form.Label>
                <Form.Control
                  type="text"
                  name="account_holder"
                  value={formData.account_holder}
                />
              </Form.Group>

              <Form.Group controlId="formSortCode">
                <Form.Label>Sort Code</Form.Label>
                <Form.Control
                  type="text"
                  name="sort_code"
                  value={formData.sort_code}
                />
              </Form.Group>
    
              <Form.Group controlId="formAccountNumber">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  type="text"
                  name="account_number"
                  value={formData.account_number}
                />
              </Form.Group>
    
              <Form.Group controlId="formBalance">
                <Form.Label>Balance</Form.Label>
                <Form.Control
                  type="text"
                  name="balance"
                  value={formData.balance}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Body>
          <Form>
            <Modal.Title>Latest Action</Modal.Title>
              <Form.Group controlId="formPay">
                <Form.Label>Payment Out</Form.Label>
                <Form.Control
                  type="text"
                  name="pay"
                  value={formData.pay}
                />
              </Form.Group>
    
              <Form.Group controlId="formReceive">
                <Form.Label>Payment In</Form.Label>
                <Form.Control
                  type="text"
                  name="received"
                  value={formData.receive}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );

}

export default ViewAccount;