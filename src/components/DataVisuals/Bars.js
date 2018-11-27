import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';

export default function Bars({ data, title }) {
  return (
    <ChartContainer title={title}>
      <Bar
        data={data}
        options={{
          scales: {
            xAxes: [
              {
                gridLines: {
                  offsetGridLines: false,
                },
              },
            ],
          },
        }}
      />
    </ChartContainer>
  );
}

Bars.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.string,
};
