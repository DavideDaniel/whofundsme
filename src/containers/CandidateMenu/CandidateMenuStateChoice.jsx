import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CandidateMenuSelectField from './CandidateMenuSelectField.jsx';
import { AutoComplete } from 'material-ui';
import { fetchCandidateList } from '../../actions/index.js';

class CandidateMenuStateChoice extends Component {
    constructor(props, content) {
        super(props, content);
        this.state = {
          statePicked: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(input) {
      this.setState({
        statePicked : true
      })
      const {dispatch} = this.props;
      const searchTerm = input;
      dispatch(fetchCandidateList(input));
    }

    render() {
      let candidateChoice = (<div/>);
      const {stateName, stateList, list} = this.props;
      if(this.state.statePicked){
        candidateChoice = (<CandidateMenuSelectField disabled={false}/>);
      } else {
        candidateChoice = (<CandidateMenuSelectField disabled={true} />);
      }
        return (
          <div
          style = {{
            'width': '100%',
          'display': 'flex',
          'margin': '0',
          'flexFlow': 'row wrap',
        'justifyContent': 'flex-end'}}>
          <AutoComplete {...this.props}
            targetOrigin={{
              vertical: 'bottom',
              horizontal: 'middle'
            }}
            hintText={"Type in a US state to start"}
            anchorOrigin={{ vertical: 'bottom'}}
            floatingLabelText={"Choose a state first"}
            ref="stateChoice"
            onNewRequest={this.handleSubmit}
            filter= {AutoComplete.caseInsensitiveFilter}
            fullWidth= {true}
            style = {{
              'width': '100%',
              'textAlign': 'center'
            }}
            dataSource={ [...stateList] } />
                { candidateChoice }
                </div>

            );
    }
}
function mapStateToProps(state) {
    const {dataByState: {stateName, stateList, list}} = state;
    return {
        stateList,
        stateName,
        list
    };
}

export default connect(mapStateToProps)(CandidateMenuStateChoice);
