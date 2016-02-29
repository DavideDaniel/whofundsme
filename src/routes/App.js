import React, {Component, PropTypes} from 'react';

import '../assets/css/flexboxgrid.css';
import '../assets/css/font-awesome.css';
import '../assets/css/main.css';
import BaseTheme from '../assets/theme/base_theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

import CandidatePage from '../containers/General/CandidatePage.jsx';

@ThemeDecorator(ThemeManager.getMuiTheme(BaseTheme))
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
