import React from 'react';

const Box = ({ children, ...props }) => (
  <div {...props} className="box">
    {children}
  </div>
);

export default Box;
