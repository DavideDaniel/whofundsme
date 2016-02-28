import React, { Component, PropTypes } from 'react';
import { MenuItem } from 'material-ui';

class CandidateMenuSelectItem extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {item } = this.props;
        return (<MenuItem {...this.props} primaryText={item.name} value={item.crp_id}/>);
    }
}

CandidateMenuSelectItem.PropTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        crp_id: PropTypes.string
    })
};

export default CandidateMenuSelectItem;
