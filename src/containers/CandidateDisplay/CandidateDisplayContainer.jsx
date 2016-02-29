import Row from '../../components/FlexboxGrid/Row.jsx';
import Col from '../../components/FlexboxGrid/Col.jsx';
import Box from '../../components/FlexboxGrid/Box.jsx';
import {Paper,Card,CardHeader,FlatButton,Avatar} from 'material-ui';
import React from 'react'
import VBar from '../../components/DataVisuals/VBar.jsx';
import PieSquared from '../../components/DataVisuals/PieSquared.jsx';

const CandidateDisplayContainer = ({candidates}) => {
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
                    <CardHeader title={'Industries'} />
                    <Card expandable={false}>
                  <VBar data={candidate.industries} />
                  </Card>
                    </Card>
                    <Card>
                    <CardHeader title={'Sectors'} showExpandableButton={true} />
                    <Card initiallyExpanded={false} expandable={true}>
                      <PieSquared  data={candidate.sectors} title={'$ from sectors'}/>
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


