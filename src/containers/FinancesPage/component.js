import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import LegislatorCard from '../../components/LegislatorCard';
import Row from '../../components/FlexboxGrid/Row';
import Box from '../../components/FlexboxGrid/Box';
import { Spacer, PaddedCol } from '../../components/styled';
import Donut from '../../components/DataVisuals/Donut';
import Bars from '../../components/DataVisuals/Bars';

const colors = [
  '#8dd3c7',
  '#ffffb3',
  '#bebada',
  '#fb8072',
  '#80b1d3',
  '#fdb462',
  '#b3de69',
  '#fccde5',
  '#2196F3',
  '#bc80bd',
  '#ccebc5',
  '#ffed6f',
  '#E91E63',
];

class FinancesPage extends Component {
  constructor() {
    super();
    this.state = {
      dataSet: null,
    };
    this.transformDataSet = this.transformDataSet.bind(this);
  }

  componentDidMount() {
    const { fetchLegislatorByCrpId, crpId } = this.props;
    fetchLegislatorByCrpId(crpId);
  }

  transformDataSet(e) {
    const option = e.value;
    const data = this.props[option]; // eslint-disable-line
    let dataKey = '';
    switch (option) {
      case 'contributors':
        dataKey = 'org_name';
        break;
      case 'sectors':
        dataKey = 'sector_name';
        break;
      case 'industries':
        dataKey = 'industry_name';
        break;
      default:
        break;
    }
    if (data) {
      this.setState({ dataSet: data, dataKey });
    }
  }

  renderBars() {
    const { dataSet, dataKey } = this.state;
    if (dataSet) {
      const data = dataSet.reduce(
        (prev, curr, i) => {
          const prevIndivDataset = prev.datasets[0] || {};
          const prevPacDataset = prev.datasets[1] || {};
          const prevIndivDatasetData = prevIndivDataset.data || [];
          const prevPacDatasetData = prevPacDataset.data || [];
          const prevDatasetColor = prevIndivDataset.backgroundColor || [];
          const backgroundColor = [...prevDatasetColor, colors[i]];
          return {
            labels: [...prev.labels, curr[dataKey]],
            datasets: [
              {
                label: 'Individuals',
                data: [...prevIndivDatasetData, Number(curr.indivs)],
                backgroundColor,
              },
              {
                label: 'Pacs',
                data: [...prevPacDatasetData, Number(curr.pacs)],
                backgroundColor,
              },
            ],
          };
        },
        { labels: [], datasets: [] }
      );
      return <Bars data={data} />;
    }
    return null;
  }

  renderDonut() {
    const { dataSet, dataKey } = this.state;
    if (dataSet) {
      const data = dataSet.reduce(
        (prev, curr, i) => {
          const prevDataset = prev.datasets[0] || {};
          const prevDatasetData = prevDataset.data || [];
          const prevDatasetColor = prevDataset.backgroundColor || [];
          const backgroundColor = [...prevDatasetColor, colors[i]];
          const datum = Number(curr.pacs) + Number(curr.indivs);
          return {
            labels: [...prev.labels, curr[dataKey]],
            datasets: [
              {
                data: [...prevDatasetData, datum],
                backgroundColor,
              },
            ],
          };
        },
        { labels: [], datasets: [] }
      );
      return <Donut data={data} />;
    }
    return null;
  }

  render() {
    const { crpId, stateName } = this.props;
    const { dataSet } = this.state;
    const options = [
      { value: 'industries', label: 'Industries' },
      { value: 'sectors', label: 'Sectors' },
      { value: 'contributors', label: 'Organizations' },
    ];
    return (
      <PaddedCol className="col-xs-12 col-sm-12">
        <Box>
          <Row>
            <LegislatorCard crpId={crpId} stateName={stateName}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isDisabled={false}
                isLoading={false}
                isClearable={false}
                isSearchable
                name="DataSets"
                defaultMenuIsOpen
                options={options}
                onChange={this.transformDataSet}
              />
              <Spacer />
              {dataSet && this.renderBars(dataSet)}
              <Spacer />
              {dataSet && this.renderDonut(dataSet)}
            </LegislatorCard>
          </Row>
        </Box>
      </PaddedCol>
    );
  }
}

FinancesPage.propTypes = {
  fetchLegislatorByCrpId: PropTypes.func,
  crpId: PropTypes.string,
  stateName: PropTypes.string,
};

export default FinancesPage;
