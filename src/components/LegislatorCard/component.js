import React from 'react';
import PropTypes from 'prop-types';
import { CardWrapper, CardSubtitle, CardTitle } from './styled';
// import { Card, CardMedia, CardTitle, CardActions } from 'react-toolbox/lib/card';
// import { Button } from 'react-toolbox/lib/button';

function LegislatorCard({ name, stateName, children }) {
  return (
    <CardWrapper>
      <CardTitle>{name}</CardTitle>
      <CardSubtitle>{stateName}</CardSubtitle>
      {/* <img alt={name} src={image} /> */}
      {children}
    </CardWrapper>
  );
}
LegislatorCard.propTypes = {
  name: PropTypes.string,
  stateName: PropTypes.string,
  // image: PropTypes.string,
  children: PropTypes.node,
};
LegislatorCard.defaultProps = {
  name: 'Full Name and title',
  stateName: 'State name',
};
export default LegislatorCard;
