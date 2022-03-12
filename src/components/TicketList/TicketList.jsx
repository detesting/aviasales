import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button } from 'antd';

import { getTickets, addFiveTickets } from '../../store/ticketsSlice';
import Loading from '../Loading';
import Ticket from '../Ticket';

import './TicketList.css';

export default function TicketList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);
  const loading = useSelector((state) => state.tickets.loading);

  const tickets = useSelector((state) => state.tickets.tickets);
  const tabsValue = useSelector((state) => state.tabs.value);
  const filterValue = useSelector((state) => state.filters.value);
  const all = useSelector((state) => state.filters.all);

  const countTickets = useSelector((state) => state.tickets.countTickets);

  const filterStops = (count) => {
    if (count <= 3) {
      for (let i = 0; i < filterValue.length; i++) {
        switch (filterValue[i]) {
          case 'Без пересадок':
            if (count === 0) {
              return true;
            }
            break;
          case '1 пересадка':
            if (count === 1) {
              return true;
            }
            break;
          case '2 пересадки':
            if (count === 2) {
              return true;
            }
            break;
          case '3 пересадки':
            if (count === 3) {
              return true;
            }
            break;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  let data = tickets
    .filter((item) => {
      if (all) {
        return true;
      }
      if (!filterValue) {
        return false;
      }
      let result = filterStops(item.segments[0].stops.length);
      if (!result) {
        return filterStops(item.segments[1].stops.length);
      }
      return result;
    })
    .sort((a, b) => {
      let durationOne = a.segments[0].duration + a.segments[1].duration;
      let durationTwo = b.segments[0].duration + b.segments[1].duration;
      switch (tabsValue) {
        case 'cheap':
          return a.price - b.price;
        case 'fast':
          return durationOne - durationTwo;
      }
    });

  let viewTickets = data.slice(0, countTickets);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="ticket_list">
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={viewTickets}
            renderItem={(ticket) => (
              <List.Item>
                <Ticket ticket={ticket} />
              </List.Item>
            )}
          />
          <Button type="primary" className="button_add" onClick={() => dispatch(addFiveTickets())}>
            Показать еще 5 билетов!
          </Button>
        </div>
      )}
    </div>
  );
}
