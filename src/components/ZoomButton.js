import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: 2px solid #6eb06e;
  padding: 0.75em 1.25em;
  background: #9fdfa7;
  border-radius: 5px;
  margin-top: 1em;
  cursor: pointer;
`;

const ZoomButton = ({ zoomed, zoomToggler }) => {
  return (
    <Button onClick={zoomToggler}>{zoomed ? 'Zoom Out' : 'Zoom In'}</Button>
  );
};

export default ZoomButton;
