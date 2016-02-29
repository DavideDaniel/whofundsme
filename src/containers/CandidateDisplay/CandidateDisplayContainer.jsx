import Row from '../../components/FlexboxGrid/Row.jsx';
import Col from '../../components/FlexboxGrid/Col.jsx';
import Box from '../../components/FlexboxGrid/Box.jsx';
import {Paper,Card,CardHeader,FlatButton,Avatar} from 'material-ui';
import React from 'react'
import Pie from '../../components/DataVisuals/Pie.jsx';

const CandidateDisplayContainer = ({candidates}) => {
  debugger
  return (
    <Box>
      <Row>
      {candidates.map((candidate, index) => (
        <Col className="col-xs-12 col-sm-8 col-md-6 col-lg-4" key={index}>
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
                    <CardHeader title={candidate.name} subtitle={candidate.state} avatar={< Avatar />} showExpandableButton={true}/>
                    <Card>
                  <Row className="row center-xs">
                      <Col className="col-xs-6">
                        <Box>
                          <FlatButton href={`https://twitter.com/${candidate.twitter_id}`}
                            linkButton={true} label="Twitter"/>
                          <FlatButton href={candidate.url} linkButton={true} label="Site"/>
                        </Box>
                      </Col>
                    </Row>
                    </Card>
                    </Card>
                    <Card>
                    <CardHeader title={'Industries'} showExpandableButton={true} />
                    <Card initiallyExpanded={false} expandabale={true}>
                  <Pie style={{"margin":"0 auto"}} data={candidate.industries} title={'$ from industries'}/>
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


