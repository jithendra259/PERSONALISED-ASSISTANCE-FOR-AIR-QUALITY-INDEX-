import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  return (
    <div className="linechart me-4" style={{ flex: '1 1 300px', minWidth: '300px', height: '300px' }}>
      <Line data={data} options={{ maintainAspectRatio: false, responsive: true }} />
    </div>
  );
};

export default LineChart;