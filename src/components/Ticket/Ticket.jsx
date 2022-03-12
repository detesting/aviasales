import React from 'react';
import { Card } from 'antd';

import './Ticket.css';

export default function Ticket({ ticket }) {
  const { price, carrier, segments } = ticket;

  const getDate = (date, duration) => {
    let dateStart = new Date(date);
    let dateStartString =
      (String(dateStart.getHours()).length === 2 ? dateStart.getHours() : '0' + dateStart.getHours()) +
      ':' +
      (String(dateStart.getMinutes()).length === 2 ? dateStart.getMinutes() : '0' + dateStart.getMinutes());

    let dateEnd = new Date(duration * 60 * 1000 + dateStart.getTime());
    let dateEndString =
      (String(dateEnd.getHours()).length === 2 ? dateEnd.getHours() : '0' + dateEnd.getHours()) +
      ':' +
      (String(dateEnd.getMinutes()).length === 2 ? dateEnd.getMinutes() : '0' + dateEnd.getMinutes());
    return dateStartString + ' - ' + dateEndString;
  };

  const getTimeInWay = (duration) => {
    let minutes = duration % 60;
    let hours = (duration - minutes) / 60;
    return hours + 'ч ' + minutes + 'м';
  };

  const getNumberTransplants = (stops) => {
    return !stops.length ? 'Без пересадок' : stops.length === 1 ? '1 пересадка' : stops.length + ' пересадки';
  };

  const getTransplants = (stops) => {
    let stopsString = '';
    stops.forEach((item) => {
      stopsString += item + ', ';
    });
    return stopsString.length ? stopsString.slice(0, stopsString.length - 2) : null;
  };
  return (
    <div>
      <Card hoverable className="ticket">
        <div className="ticket__header">
          <div className="ticket__price">{price} Р</div>
          <div>
            <img src={`https://pics.avs.io/99/36/{${carrier}}.png`} alt="aviaLogo" />
          </div>
        </div>
        <div className="ticket__body">
          <div className="ticket__column">
            <div className="there__city">
              <div className="city__name ticket__label">
                {segments[0].origin} - {segments[0].destination}
              </div>
              <div className="there__time ticket__data">{getDate(segments[0].date, segments[0].duration)}</div>
            </div>
            <div className="there__city">
              <div className="city__name ticket__label">
                {segments[1].origin} - {segments[1].destination}
              </div>
              <div className="there__time ticket__data">{getDate(segments[1].date, segments[1].duration)}</div>
            </div>
          </div>
          <div className="ticket__column">
            <div className="there__way">
              <div className="way__name ticket__label">В пути</div>
              <div className="there__time ticket__data">{getTimeInWay(segments[0].duration)}</div>
            </div>
            <div className="there__way">
              <div className="way__name ticket__label">В пути</div>
              <div className="there__time ticket__data">{getTimeInWay(segments[1].duration)}</div>
            </div>
          </div>
          <div className="ticket__column">
            <div className="there__transplants">
              <div className="transplants__name ticket__label">{getNumberTransplants(segments[0].stops)}</div>
              <div className="transplants__count ticket__data">{getTransplants(segments[0].stops)}</div>
            </div>
            <div className="there__transplants">
              <div className="transplants__name ticket__label">{getNumberTransplants(segments[1].stops)}</div>
              <div className="transplants__count ticket__data">{getTransplants(segments[1].stops)}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
