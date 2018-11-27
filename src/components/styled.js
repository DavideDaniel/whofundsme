import styled, { css } from 'react-emotion';
import Col from './FlexboxGrid/Col';

const extraPadding = css`
  padding: 1em;
`;

export const PaddedCol = styled(Col)`
  ${extraPadding}
`;

export const PaddedBox = styled('div')`
  ${extraPadding}
`;

export const Spacer = styled(PaddedBox)`
  box-shadow: 0 -1px 0 #ccc;
  margin: 8px auto;
  min-width: 300px;
  width: 90%;
`;
