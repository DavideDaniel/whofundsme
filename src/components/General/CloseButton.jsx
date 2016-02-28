import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

class CloseButton extends Component {
  constructor(props, content) {
      super(props, content);
    }
  render() {
    const style = {
      top: '0',
      right: '0',
      position: 'absolute'
    };
    return (
      <FloatingActionButton
          style={style}
          iconClassName={"fa fa-times"}
          onClick={this.props.removeHandler}>
      </FloatingActionButton>
    );
  }
}

export default CloseButton;