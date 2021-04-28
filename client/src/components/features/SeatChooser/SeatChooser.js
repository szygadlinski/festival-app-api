import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';
import { io } from 'socket.io-client';

import './SeatChooser.scss';

class SeatChooser extends React.Component {

  componentDidMount() {
    const { loadSeats, loadSeatsData } = this.props;
    loadSeats();

    this.socket = io.connect(process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:7000', {
      transports: ['websocket'],
    });

    this.socket.on('seatsUpdated', seats => loadSeatsData(seats));

    this.countTaken = 0;
    this.allSeats = 50;
  }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;

    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;


    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) {
      this.countTaken++;
      return <Button key={seatId} className="seats__seat seats__taken" disabled color="secondary">{seatId}</Button>;
    }
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  render() {

    const { prepareSeat } = this;
    const { requests } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" disabled /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" disabled /> – it's empty</small>
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(this.allSeats)].map((x, i) => prepareSeat(i+1) )}</div>}
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
        <p>{`Free seats: ${this.allSeats - this.countTaken}/${this.allSeats}`}</p>
      </div>
    )
  };
}

export default SeatChooser;
