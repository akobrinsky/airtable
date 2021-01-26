import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import timelineItems from '../../timelineItems';
import Row from '../Row';
import EventHeader from '../EventHeader';
import ZoomButton from '../ZoomButton';

// grid columns based on endGrid
const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.endGrid},
    ${(props) => (!props.zoomed ? '150px' : '50px')}
  );
  grid-gap: 0.5em;
  overflow-x: scroll;
`;

const Timeline = () => {
  // events state is rows / stacks of organized events from the buildRows function below which is called in the useEffect
  // zoomed state is used for toggling between all days view and week view
  // grid is config to pass around to manage event placement in the grid
  const [events, setEvents] = useState([]);
  const [grid, setGrid] = useState({});
  const [eventInputValues, setEventInputValues] = useState({});
  const [zoomed, setZoomed] = useState(false);

  const sorter = (eventArray) => {
    return eventArray.sort((a, b) => {
      const aStart = Date.parse(a.start);
      const bStart = Date.parse(b.start);
      if (aStart > bStart) return 1;
      if (aStart < bStart) return -1;
      return 0;
    });
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    const newValues = { ...eventInputValues };
    newValues[name] = value;
    setEventInputValues(newValues);
  };

  const zoomToggler = () => {
    const newZoom = !zoomed;
    setZoomed(newZoom);
  };

  // The main purpose of buildRows is to make stacks of events to optimize use of space in grid tracks
  const buildRows = (sortedArray) => {
    if (!sortedArray.length) return [];
    let idx = 0;
    const sortedEvents = [[sortedArray[0]]];
    let mutableEvents = [...sortedArray];
    while (mutableEvents.length > 0) {
      const stack = [];
      for (let i = 0; i < mutableEvents.length; i += 1) {
        const previous = sortedEvents[idx][sortedEvents[idx].length - 1];
        const current = mutableEvents[i];
        if (previous.id === current.id) continue;
        if (Date.parse(current.start) < Date.parse(previous.end)) {
          stack.push(current);
        } else {
          sortedEvents[idx].push(current);
        }
      }
      mutableEvents = [...stack];
      if (mutableEvents.length) {
        idx += 1;
        sortedEvents[idx] = [mutableEvents.shift()];
      }
    }
    return sortedEvents;
  };

  // originally used this to loop through to get max date for building out the grid
  // instead of using another loop to build the input state object, quick way to build out the input values and save performance
  // so in summary it builds up grid config and sets the input values state
  // I would decouple this in refactoring
  const buildEventState = (events) => {
    if (!events.length) return [];
    const firstEvent = events[0];
    let last = moment(firstEvent.end);
    let first = moment(firstEvent.start);
    const eventInputs = {
      [firstEvent.id]: firstEvent.name,
    };
    for (let i = 1; i < events.length; i += 1) {
      const current = events[i];
      eventInputs[current.id] = current.name;
      const currentLast = moment(current.end);
      last = moment.max(last, currentLast);
    }
    const endGrid = last.diff(first, 'days');
    setEventInputValues({ ...eventInputs });
    // returning a grid config for child components to setup grid placement based on values relative to start and length
    return {
      start: events[0].start,
      length: endGrid + 1,
    };
  };

  useEffect(() => {
    sorter(timelineItems);
    const sortedEvents = buildRows(timelineItems);
    setEvents([...sortedEvents]);

    const gridConfig = buildEventState(timelineItems);
    setGrid(gridConfig);
  }, []);

  return events.length ? (
    <React.Fragment>
      <EventGrid endGrid={grid.length} className="event-grid" zoomed={zoomed}>
        <EventHeader grid={grid} zoomed={zoomed} />
        {events.map((row, idx) => (
          <Row
            changer={inputChangeHandler}
            grid={grid}
            events={row}
            key={`row-${idx}`}
            inputs={eventInputValues}
          />
        ))}
      </EventGrid>
      <ZoomButton zoomToggler={zoomToggler} zoomed={zoomed} />
    </React.Fragment>
  ) : (
    <h2>No events in the database</h2>
  );
};

export default Timeline;
