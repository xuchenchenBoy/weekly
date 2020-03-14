import React from 'react';

function Separate(props) {
  const { width = 10, height = 10, vertical = true } = props;
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    display: vertical ? 'block' : 'inline-block',
  };
  return <div style={style}></div>;
}

export default Separate;
