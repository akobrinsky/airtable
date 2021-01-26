import React from 'react';
import Event from './Event';

const Row = ({ events, grid, changer, inputs }) => {
  return events.map((event) => (
    <Event
      key={event.id}
      event={event}
      grid={grid}
      changer={changer}
      inputs={inputs}
    />
  ));
};

export default Row;
