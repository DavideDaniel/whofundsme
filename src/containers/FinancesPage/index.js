import { connect } from 'react-redux';
import { fetchLegislatorByCrpId } from '../../state';
import FinancesPage from './component';
import { getIndustries, getSectors, getLegislatorState, getContributors } from '../../selectors';

export default connect(
  (state, props) => ({
    industries: getIndustries(state, props),
    sectors: getSectors(state, props),
    stateName: getLegislatorState(state, props),
    contributors: getContributors(state, props),
  }),
  { fetchLegislatorByCrpId }
)(FinancesPage);
