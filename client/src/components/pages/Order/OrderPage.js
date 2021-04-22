import React from 'react';

import { Container } from 'reactstrap';
import OrderTicketForm from '../../features/OrderTicketForm/OrderTicketFormContainer';

const Order = () => (
  <Container>
    <h1>Order a ticket</h1>
    <OrderTicketForm />
  </Container>
);

export default Order;