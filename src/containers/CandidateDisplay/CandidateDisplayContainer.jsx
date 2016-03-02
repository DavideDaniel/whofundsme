import Row from '../../components/FlexboxGrid/Row.jsx';
import Col from '../../components/FlexboxGrid/Col.jsx';
import Box from '../../components/FlexboxGrid/Box.jsx';
import {Paper,Card,CardHeader,FlatButton,Avatar} from 'material-ui';
import React from 'react'
import VBar from '../../components/DataVisuals/VBar.jsx';
import VBarStacked from '../../components/DataVisuals/VBarStacked.jsx';
import VPie from '../../components/DataVisuals/VPie.jsx';

const CandidateDisplayContainer = ({candidates}) => {
  String.prototype.capitalize = function(lower) {
  return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
    });
  }

  function formatSubtitle(candidate){
    let subStr = `${candidate.state}, ${candidate.chamber.capitalize()}`
    return candidate.party == 'R' ? `${subStr} Republican`:`${subStr} Democrat`
  }

  return (
    <Box>
      <Row>
      {candidates.map((candidate, index) => (
        <Col className="col-xs-12 col-sm-12 col-md-6 col-lg-6" key={index}>
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
                    <CardHeader title={candidate.name} subtitle={formatSubtitle(candidate)} avatar={< Avatar />} showExpandableButton={true}/>
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
                  <VBarStacked data={candidate.monies} />
                  </Card>
                    </Card>
                    <Card>
                    <CardHeader title={'Industries'} showExpandableButton={true}/>
                    <Card initiallyExpanded={false} expandable={true}>
                  <VBar data={candidate.industries} />
                  </Card>
                    </Card>
                    <Card>
                    <CardHeader title={'Sectors'} showExpandableButton={true} />
                    <Card initiallyExpanded={false} expandable={true}>
                      <VPie  data={candidate.sectors} />
                  </Card>
                    </Card>

                </div>
              </div>
            </Paper>
          </Box>
        </Col>
      ))}
    </Row>
  </Box>
  )
}

export default CandidateDisplayContainer;


