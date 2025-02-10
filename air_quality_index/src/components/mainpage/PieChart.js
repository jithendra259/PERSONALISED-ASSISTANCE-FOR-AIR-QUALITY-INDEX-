import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  return (
    <div className="piechart" style={{ flex: '1 1 300px', minWidth: '300px', height: '300px' }}>
      <Pie data={data} options={{ maintainAspectRatio: false, responsive: true }} />
    </div>
  );
};

export default PieChart;