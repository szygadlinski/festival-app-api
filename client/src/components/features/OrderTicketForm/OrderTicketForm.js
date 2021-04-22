import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Alert, Progress } from 'reactstrap';

import './OrderTicketForm.scss';
import SeatChooser from './../SeatChooser/SeatChooserContainer';

class OrderTicketForm extends React.Component {

  state = {
    order: {
      client: '',
      email: '',
      day: 1,
      seat: '',
    },
    isError: false,
  }

  updateSeat = (e, seatId) => {
    const { order } = this.state;

    e.preventDefault();
    this.setState({ order: { ...order, seat: seatId }});
  }

  updateTextField = ({ target }) => {
    const { order } = this.state;
    const { value, name } = target;

    this.setState({ order: { ...order, [name]: value }});
  }

  updateNumberField = ({ target }) => {
    const { order } = this.state;
    const { value, name } = target;

    this.setState({ order: { ...order, [name]: parseInt(value) }});
  }

  submitForm = async (e) => {
    const { order } = this.state;
    const { addSeat } = this.props;

    e.preventDefault();

    if(order.client && order.email && order.day && order.seat) {
      addSeat(order);
      this.setState({ 
        order: {
          client: '',
          email: '',
          day: 1,
          seat: '',
        },
        isError: false,
      });
    } else {
      this.setState({ isError: true });
    }
  }

  render() {

    const { updateSeat, updateTextField, updateNumberField, submitForm } = this;
    const { requests } = this.props;
    const { order, isError } = this.state;

    return (
      <Form className="order-ticket-form" onSubmit={submitForm}>
        <Row>
          <Col xs="12" md="6">
            { (isError) && <Alert color="warning">There are some errors in you form. Have you fill all the fields? Maybe you forgot to choose your seat?</Alert> }
            { (requests['ADD_SEAT'] && requests['ADD_SEAT'].error && !isError) && <Alert color="danger">{requests['ADD_SEAT'].error}</Alert> }
            { (requests['ADD_SEAT'] && requests['ADD_SEAT'].success && !isError) && <Alert color="success">You've booked your ticket! Check you email in order to make a payment.</Alert> }
            { (requests['ADD_SEAT'] && requests['ADD_SEAT'].pending) && <Progress animated className="mb-5" color="primary" value={75} /> }
            <FormGroup>
              <Label for="clientEmail">Name</Label>
              <Input type="text" value={order.client} name="client" onChange={updateTextField} id="clientName" placeholder="John Doe" />
            </FormGroup>
            <FormGroup>
              <Label for="clientEmail">Email</Label>
              <Input type="email" value={order.email} name="email" onChange={updateTextField} id="clientEmail" placeholder="johndoe@example.com" />
            </FormGroup>
            <FormGroup>
              <Label for="clientDay">Select which day of festivals are you interested in:</Label>
              <Input type="select" value={order.day} name="day" onChange={updateNumberField} id="exampleSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Input>
              <small id="dayHelp" className="form-text text-muted">Every day of the festival uses individual ticket. You can book only one ticket at the time.</small>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input required type="checkbox" /> I agree with <a href="#">Terms and conditions</a> and <a href="#">Privacy Policy</a>.
              </Label>
            </FormGroup>
            <Button color="primary" className="mt-3">Submit</Button>
          </Col>
          <Col xs="12" md="6">
            <SeatChooser 
              chosenDay={order.day}
              chosenSeat={order.seat} 
              updateSeat={updateSeat} />
          </Col>
        </Row>
      </Form>
    )
  };
}

export default OrderTicketForm;