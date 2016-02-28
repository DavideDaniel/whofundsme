import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Avatar,
  FlatButton,
  Paper,
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui';
import Row from '../../components/FlexboxGrid/Row.jsx';
import Col from '../../components/FlexboxGrid/Col.jsx';
import Box from '../../components/FlexboxGrid/Box.jsx';
import Pie from '../../components/DataVisuals/Pie.jsx';

class CandidateMenuGeneratedProfile extends Component {

  constructor(props, content) {
    super(props, content);
  }
  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
  }
  componentWillUpdate(nextProps, nextState) {
    const {dispatch} = this.props;
  }
  componentDidMount() {
    // this.update(this.props)
    const {dispatch} = this.props;
  }

  render() {
    const {stateChoice, list, candidateProfiles} = this.props;

    return (
      <div {...this.props}>

        <Pie/>
      </div>

    );
  }
}
function mapStateToProps(state) {
  const {
    menu : {
      stateChoice,
      list
    }
  } = state;
  return {stateChoice, list};
}

export default connect(mapStateToProps)(CandidateMenuGeneratedProfile);
