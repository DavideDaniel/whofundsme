import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Row from '../../components/FlexboxGrid/Row.jsx';
import Col from '../../components/FlexboxGrid/Col.jsx';
import Box from '../../components/FlexboxGrid/Box.jsx';
import {Paper,Card,CardHeader,FlatButton,Avatar} from 'material-ui';
import DBar from '../../components/DataVisuals/DBar.jsx';
import DDonut from '../../components/DataVisuals/DDonut.jsx';
import DGroupedBar from '../../components/DataVisuals/DGroupedBar.jsx';
import CandidateClose from './CandidateClose.jsx';
import d3 from 'd3';


String.prototype.capitalize = function(lower) {
return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) {
  return a.toUpperCase();
  });
}

function formatSubtitle(candidate){
  let subStr = `${candidate.state}, ${candidate.chamber.capitalize()}`
  return candidate.party == 'R' ? `${subStr} Republican`:`${subStr} Democrat`
}

class CandidateBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      candidate: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({candidate:nextProps.candidate})
    // console.log(nextProps);
  }

  componentWillUnmount() {
      d3.select('svg').remove();
  }

  render(){
    const {candidate} = this.props;


  return (<Col {...this.props}  className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
    <Box>
      <Paper style={{
        "width": "100%",
        "height": "100%"
      }} zDepth={1} rounded={true}>
        <div style={{
          "padding": "1em"
        }}>
          <div style={{
            "display": "block",
            "padding": "0.5em"
          }}>
            <Card initiallyExpanded={true}>
              <CardHeader title={candidate.name} subtitle={formatSubtitle(candidate)} avatar={< Avatar />} ref='closer'>
                <CandidateClose onClick={(e)=>this.props.delCandidate(e,candidate.crp_id)} />
              </CardHeader>
              <Card>
            <Row className="row center-xs">
                  <Box>
                    <FlatButton href={`https://twitter.com/${candidate.twitter_id}`}
                      linkButton={true} label={`@${candidate.twitter_id}`}/>
                    <FlatButton href={candidate.url} linkButton={true} label="Site"/>
                  </Box>

              </Row>
              </Card>
              </Card>
              <Card>
              <CardHeader title={'Finances'} showExpandableButton={true}/>
              <Card initiallyExpanded={false} expandable={true}>
            <DBar data={candidate.summary} />
            </Card>
              </Card>
              <Card>
              <CardHeader title={'Industries'} showExpandableButton={true}/>
              <Card initiallyExpanded={false} expandable={true}>
              <DGroupedBar data={candidate.industries} />
            </Card>
              </Card>
              <Card>
              <CardHeader title={'Sectors'} showExpandableButton={true} />
              <Card initiallyExpanded={false} expandable={true}>
                <DDonut data = {candidate.sectors} />
            </Card>
              </Card>

          </div>
        </div>
      </Paper>
    </Box>
  </Col>)}
}

CandidateBox.PropTypes = {
  candidate: PropTypes.object.isRequired
}

export default CandidateBox;
