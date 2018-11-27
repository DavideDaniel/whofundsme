import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const sharedTextStyles = css`
  display: block;
  font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
  text-align: center;
  @media (max-width: 640px) {
    text-align: left;
  }
`;
const Title = styled('h3')`
  font-size: 21px;
  font-weight: bold;
  margin: 0;
  ${sharedTextStyles}
`;

const SubTitle = styled('span')`
  font-size: 14px;
  margin: 10px 0;
  ${sharedTextStyles}
`;

const ChartTitle = ({ title, subtitle }) =>
  title || subtitle ? (
    <React.Fragment>
      {title && <Title>{title}</Title>}
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </React.Fragment>
  ) : null;

ChartTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

ChartTitle.defaultProps = {};

export default ChartTitle;
