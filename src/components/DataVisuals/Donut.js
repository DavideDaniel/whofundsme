import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import numeral from 'numeral';
import ChartContainer from './ChartContainer';

export default function Donut({ data, title }) {
  return (
    <ChartContainer title={title}>
      <Doughnut
        data={data}
        options={{
          // circumference: Math.PI,
          // rotation: Math.PI,
          cutoutPercentage: 60,
          legend: { position: 'top', fullWidth: true },
          tooltips: {
            callbacks: {
              label: (tooltipItem, datum) => {
                let label = datum.labels[tooltipItem.index] || '';
                const num = datum.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                if (label) {
                  label += ': ';
                }
                label += numeral(num).format('$0,0');
                return label;
              },
            },
          },
        }}
      />
    </ChartContainer>
  );
}

Donut.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.string,
};
