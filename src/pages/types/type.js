import React from 'react';

function Type(props) {
  return (
    <div>
      <h1>Type {props.type}</h1>
      <p>This is the content of {props.type}.</p>
    </div>
  );
}

export default Type;