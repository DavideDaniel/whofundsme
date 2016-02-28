import React, {Component, PropTypes} from 'react';

import '../assets/css/flexboxgrid.css';
import '../assets/css/font-awesome.css';
import '../assets/css/main.css';

import CandidatePage from '../containers/General/CandidatePage.jsx';

class App extends Component {

  render() {
    return (
      <div>
        <CandidatePage params={this.props.params}></CandidatePage>
      </div>
    );
  }
}

export default App;
