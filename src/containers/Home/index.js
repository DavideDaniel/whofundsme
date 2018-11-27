import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StateSelection from '../StateSelection/StateSelection';
import LegislatorBox from '../LegislatorDisplay/LegislatorBoxContainer';
import Row from '../../components/FlexboxGrid/Row';
import Box from '../../components/FlexboxGrid/Box';
import { PaddedCol, Spacer } from '../../components/styled';

const Home = ({ legislators, stateName }) => (
  <PaddedCol>
    <StateSelection />
    <Box>
      <Row>
        {legislators.map(crpId => (
          <React.Fragment>
            <LegislatorBox key={crpId} stateName={stateName} crpId={crpId} />
            <Spacer />
          </React.Fragment>
        ))}
      </Row>
    </Box>
  </PaddedCol>
);

Home.propTypes = {
  legislators: PropTypes.arrayOf(PropTypes.string),
  stateName: PropTypes.string,
};

function mapStateToProps(state) {
  const {
    stateList,
    stateData: { stateName, legislators },
  } = state;
  return {
    stateList,
    stateName,
    legislators,
  };
}

export default connect(mapStateToProps)(Home);
