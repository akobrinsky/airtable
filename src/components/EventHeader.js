import React from 'react';
import moment from 'moment';

const EventHeader = ({ grid, zoomed }) => {
  const days = [];
  for (let i = 0; i < grid.length; i += 1) {
    let current = moment(grid.start, 'YYYY-MM-DD')
      .add(i, 'days')
      .format('MMM DD');
    if (zoomed && i % 7 !== 0) current = '';
    days.push(current);
  }
  return days.map((day, idx) => (
    <span className="event-header" key={`header-day${idx}`}>
      {day}
    </span>
  ));
};

export default EventHeader;
