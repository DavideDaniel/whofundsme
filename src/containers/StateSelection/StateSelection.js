import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import { fetchLegislatorList } from '../../state';
import { getStateList, getStateLegislators } from '../../selectors';
import { PaddedBox } from '../../components/styled';

class StateSelection extends Component {
  constructor(props, content) {
    super(props, content);
    this.state = {
      stateChoice: '',
    };
    this.handleStateSelection = this.handleStateSelection.bind(this);
  }

  handleStateSelection(e) {
    this.setState({ stateChoice: e.value });
    const { dispatch } = this.props;
    dispatch(fetchLegislatorList(e.value));
  }

  render() {
    const { stateList } = this.props;
    const { stateChoice } = this.state;

    let listItems;

    if (stateList && stateList.length > 0) {
      listItems = stateList.map(value => ({
        value,
        label: value,
      }));
    }

    return (
      <nav title="WhoFundsMe">
        <PaddedBox>
          <PaddedBox>WhoFundsMe</PaddedBox>
          <Select
            className="basic-single"
            classNamePrefix="select"
            isDisabled={false}
            isLoading={false}
            isClearable
            isSearchable
            name="states"
            options={listItems}
            onChange={this.handleStateSelection}
          />
          <h2>{stateChoice}</h2>
        </PaddedBox>
      </nav>
    );
  }
}

StateSelection.propTypes = {
  stateList: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return { stateList: getStateList(state), legislators: getStateLegislators(state) };
}

export default connect(mapStateToProps)(StateSelection);
