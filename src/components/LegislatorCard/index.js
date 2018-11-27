import { connect } from 'react-redux';
import LegislatorCard from './component';
import {
  getFormattedName,
  getLegislatorFacebookAccount,
  getLegislatorTwitterAccount,
} from '../../selectors';

export default connect((state, props) => ({
  name: getFormattedName(state, props),
  facebook: getLegislatorFacebookAccount(state, props),
  twitter: getLegislatorTwitterAccount(state, props),
}))(LegislatorCard);
