import React from 'react';

const Col = ({ auto, xs, sm, md, lg, children, className, ...props }) => {
  let finalClassName = '';
  if (auto) {
    finalClassName = 'col-xs';
  } else {
    finalClassName = className || '';
    if (xs) {
      finalClassName += ` col-xs-${xs}`;
    }
    if (sm) {
      finalClassName += ` col-sm-${sm}`;
    }
    if (md) {
      finalClassName += ` col-md-${md}`;
    }
    if (lg) {
      finalClassName += ` col-lg-${lg}`;
    }
  }
  return (
    <div {...props} className={finalClassName}>
      {children}
    </div>
  );
};

export default Col;
