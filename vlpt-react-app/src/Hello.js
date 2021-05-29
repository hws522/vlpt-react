import React from 'react';

function Hello(props) {
  return (
    <div
      style={{
        color: props.color,
      }}
    >
      {props.isSpecial && <b>*</b>}
      Hello {props.name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음',
};

export default Hello;
