import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Row from '../../components/FlexboxGrid/Row.jsx';
import Col from '../../components/FlexboxGrid/Col.jsx';
import Box from '../../components/FlexboxGrid/Box.jsx';
import {Paper,Card,CardHeader,FlatButton,Avatar} from 'material-ui';
import VBar from '../../components/DataVisuals/VBar.jsx';
import VBarStacked from '../../components/DataVisuals/VBarStacked.jsx';
import VPie from '../../components/DataVisuals/VPie.jsx';
import DBar from '../../components/DataVisuals/DBar.jsx';
import DDonut from '../../components/DataVisuals/DDonut.jsx';
import DGroupedBar from '../../components/DataVisuals/DGroupedBar.jsx';
import d3 from 'd3';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

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
                <button ref={candidate.crp_id} onClick={(e)=>this.props.delCandidate(e,candidate.crp_id)} style={{
                  border: '10px',
background: 'none',
boxSizing: 'border-box',
display: 'inline-block',
font: 'inherit',
fontFamily: 'Roboto, sans-serif',
tapHighlightColor: 'rgba(0, 0, 0, 0)',
cursor: 'pointer',
textDecoration: 'none',
outline: 'none',
transform: 'translate3d(0, 0, 0)',
position: 'absolute',
transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
padding: '12px',
width: '48px',
height: '48px',
fontSize: '0',
top: '0',
bottom: '0',
margin: 'auto',
right: '4px',
'-webkit-appearance': 'button'
                  }}>
                  <div>
                    <span style={{
                      height: '100%',
width: '100%',
position: 'absolute',
top: '0',
left: '0',
overflow: 'hidden'
                      }}>

                    </span>
                    <NavigationClose />
                  </div>

                </button>
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
