import React, {Component} from 'react';
import CandidateMenuSelectItem from '../../components/CandidateMenu/CandidateMenuSelectItem.jsx';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import { connect } from 'react-redux';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import { fetchCandidateList, fetchCandidate } from '../../actions/index.js';

class CandidateMenuBar extends Component {
  constructor(props, content) {
    super(props, content);
    this.state = {
      stateChoice: '',
      candidateChoice: ''
    }
    this.handleCandidateChange = this.handleCandidateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setCandidateRef(ref){
    this.setState({candidateChoice: ref});
  }

  handleCandidateChange(e, index, value){
      const {dispatch} = this.props;
      this.props.addCandidate(value.crp_id);
      // dispatch(fetchCandidate(value.crp_id));
  }

  handleChange(e, index, value){
    this.setState({stateChoice:value});
    const {dispatch} = this.props;
    dispatch(fetchCandidateList(value));
  }

  render() {

    const {stateList, stateName, list} = this.props;

    let listItems;
    let dropMenu;

    if (list && list.length > 0) {
      listItems = list.map((item, index) => {
        return (<MenuItem ref={item.name} primaryText={item.name} value={item} key={index} />);
      });
      dropMenu =  (
        <DropDownMenu {...this.props} value={-1} disabled={false} onChange={this.handleCandidateChange}>
          <MenuItem primaryText={`Add a legislator`} value={-1} />
          {listItems}
        </DropDownMenu>
      );
    } else {
      dropMenu = (<DropDownMenu disabled={true}>
        <MenuItem primaryText={`Choose your state first`}/>
        </DropDownMenu>);
    }
    let states;
    states = stateList.map((s, i)=>{
      return (<MenuItem value={s} key={i} primaryText={s}></MenuItem>);
    });

    return (
      <div>
        <Toolbar>
          <ToolbarTitle firstChild={true} float= "left" text={"WhoFundsMe"}/>
          <ToolbarGroup float="right">
            {dropMenu}
            <ToolbarSeparator/>
              <DropDownMenu maxHeight={200} value={this.state.stateChoice} onChange={this.handleChange}>
                      {states}
                    </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

};

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

export default connect(mapStateToProps)(CandidateMenuBar);
