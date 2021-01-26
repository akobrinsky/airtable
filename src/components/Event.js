import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const EventDiv = styled.div`
  grid-column: ${(props) =>
    props.duration > 0
      ? `${props.gridIdx} / span ${props.duration}`
      : `${props.gridIdx}`};
  background: lightblue;
  padding: 0 0.5em;
  min-height: 3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #f5f5f5;
  border-left: 5px solid #77b5c9;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-size: 1.25em;
`;

const Event = ({ event, grid, changer, inputs }) => {
  const start = moment(event.start);
  const end = moment(event.end);
  let duration = end.diff(start, 'days') + 1;
  const gridStart = moment(grid.start);
  let gridIdx = start.diff(gridStart, 'days') + 1;

  return (
    <EventDiv
      gridIdx={gridIdx}
      duration={duration}
      onChange={(e) => changer(e)}
    >
      <input
        name={event.id}
        type="text"
        value={inputs[event.id]}
        onChange={(e) => changer(e)}
      />
    </EventDiv>
  );
};

export default Event;
