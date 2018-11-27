import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';
import Row from '../../components/FlexboxGrid/Row';
import Col from '../../components/FlexboxGrid/Col';
import Box from '../../components/FlexboxGrid/Box';
import LegislatorCard from '../../components/LegislatorCard';
import { getStateName, getLegislatorSummary } from '../../selectors';
import { PaddedBox } from '../../components/styled';

function LegislatorBox({ crpId, stateName, summary }) {
  const labels = Object.keys(summary);
  const datasets = [
    {
      label: 'Financial Summary',
      backgroundColor: '#bebada',
      borderColor: '#bebada',
      borderWidth: 1,
      hoverBackgroundColor: '#fb8072',
      hoverBorderColor: '#fb8072',
      data: labels.map(l => summary[l]),
    },
  ];

  const data = { labels, datasets };
  return (
    <Col className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <Box>
        <Row
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <LegislatorCard crpId={crpId} stateName={stateName}>
            <PaddedBox>
              <Link to={`legislator/${crpId}`}>Finances Page</Link>
            </PaddedBox>
            {summary && <HorizontalBar data={data} />}
          </LegislatorCard>
        </Row>
      </Box>
    </Col>
  );
}

LegislatorBox.propTypes = {
  stateName: PropTypes.string,
  crpId: PropTypes.string,
  summary: PropTypes.shape({
    cash_on_hand: PropTypes.string,
    spent: PropTypes.string,
    total: PropTypes.string,
    debt: PropTypes.string,
  }),
};

export default connect((state, props) => ({
  stateName: getStateName(state),
  summary: getLegislatorSummary(state, props),
}))(LegislatorBox);
