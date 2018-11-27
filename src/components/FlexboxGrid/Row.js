import React from 'react';
import { cx } from 'react-emotion';

const Row = ({ children, className, ...props }) => (
  <div {...props} className={cx('row', className)}>
    {children}
  </div>
);

export default Row;
