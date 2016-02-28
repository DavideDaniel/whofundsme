import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {SelectField, MenuItem} from 'material-ui';
import {fetchCandidate} from '../../actions/index.js';
import CandidateMenuSelectItem from '../../components/CandidateMenu/CandidateMenuSelectItem.jsx';
class CandidateMenuSelectField extends Component {

  constructor(props, content) {
    super(props, content);
    this.state = {
      value: "Choose a candidate"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
    const {dispatch} = this.props;
    dispatch(fetchCandidate(value));
  }

  render() {
    const {stateName, list} = this.props;
    const styles = {
      'width':'100%',
      'textAlign': 'center'
    };
    let listItems;
    if (list && list.length > 0) {
      listItems = list.map((item, index) => {
        return (<CandidateMenuSelectItem item={item} key={index} />);
      });
      return (
        <SelectField style={styles} disabled={false} onChange={this.handleChange}>
          {listItems}
        </SelectField>
      );
    } else {
      listItems = (
          <MenuItem primaryText={`Choose legislator`}/>
      );
    }
    return (<SelectField style={styles} disabled={true}>
      {listItems}
    </SelectField>);
  }
}
function mapStateToProps(state) {
  const {
    dataByState: {
      stateName,
      stateList,
      list
    }
  } = state;
  return {stateList, stateName, list};
}

export default connect(mapStateToProps)(CandidateMenuSelectField);
