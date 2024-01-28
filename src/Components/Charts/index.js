// import React, { useState } from 'react';
// import { Line } from '@ant-design/charts';
// import { Pie } from '@ant-design/charts';
// import './style.css';

// function ChartComponent({ sortedTransactions }) {
//   const [dataType, setDataType] = useState('all');
//   const [pieChartType, setPieChartType] = useState('expense');

//   const colorPalette = ['#ff0000', '#9ACD32', '#0000FF'];

//   // Extracting dates and amounts for all transactions
//   const allTransactionData = sortedTransactions.map((item) => ({
//     date: item.date,
//     amount: item.amount,
//   }));

//   // Extracting dates and amounts for all income transactions
//   const allIncomeData = sortedTransactions
//     .filter((transaction) => transaction.type === 'income')
//     .map((transaction) => ({
//       date: transaction.date,
//       amount: transaction.amount,
//     }));

//   // Extracting dates and amounts for all expense transactions
//   const allExpenseData = sortedTransactions
//     .filter((transaction) => transaction.type === 'expense')
//     .map((transaction) => ({
//       date: transaction.date,
//       amount: transaction.amount,
//     }));

//   // Function to update Line chart data based on type
//   const updateLineChart = (type) => {
//     setDataType(type);
//   };

//   // Determine which data to use based on dataType
//   let chartData;
//   switch (dataType) {
//     case 'all':
//       chartData = allTransactionData;
//       break;
//     case 'income':
//       chartData = allIncomeData;
//       break;
//     case 'expense':
//       chartData = allExpenseData;
//       break;
//     default:
//       break;
//   }

//   // Determine which color to use based on dataType
//   const lineColor = colorPalette[dataType === 'all' ? 0 : dataType === 'income' ? 1 : 2];

//   // Config for the Line chart
//   const lineChartConfig = {
//     data: chartData, // Use the dynamically determined data
//     xField: 'date',
//     yField: 'amount',
//     color: lineColor, // Use the dynamically determined color
//     point: {
//       size: 5, // Adjust the size of the data points
//       // shape: 'circle', // Change the shape of the data points (options: 'circle', 'square', 'diamond', 'triangle', 'hexagon', 'bowtie', 'cross', 'tick', 'plus', 'hyphen')
//       style: {
//         fill: 'white', // Change the fill color of the data points
//         stroke: lineColor, // Change the border color of the data points
//         lineWidth: 2, // Adjust the border width of the data points
//       },
//     },
//     line: {
//       style: {
//         stroke: lineColor, // Change the color of the line
//         lineWidth: 2, // Adjust the width of the line
//         lineJoin: 'round', // Change the line join style (options: 'miter', 'round', 'bevel')
//         lineCap: 'round', // Change the line cap style (options: 'butt', 'round', 'square')
//       },
//     },
//   };
  

//   // Expense PIE chart:
//   const expensePieData = sortedTransactions.filter((transaction) => {
//     if (transaction.type === 'expense') {
//       return {
//         tag: transaction.tag,
//         amount: transaction.amount,
//       };
//     }
//   });

//   let finalExpensePieData = expensePieData.reduce((acc, obj) => {
//     let key = obj.tag;
//     if (!acc[key]) {
//       acc[key] = {
//         tag: obj.tag,
//         amount: obj.amount,
//       };
//     } else {
//       acc[key].amount += obj.amount;
//     }
//     return acc;
//   }, {});

//   const expensePieChartConfig = {
//     data: Object.values(finalExpensePieData),
//     width: 400,
//     angleField: 'amount',
//     colorField: 'tag',
//     radius: 0.8, // Adjust the value to control the size of the donut
//     innerRadius: 0.6, // Adjust the value to control the size of the hole in the donut
//     legend: {
//       position: 'bottom',// Set the legend position to 'bottom'
//       marker: {
//         symbol: 'hexagon', // Set the legend item's shape to 'square' (you can use 'circle', 'rect', etc.)
//       },
//       itemName: {
//         style: {
//           fontSize: 19, // Adjust the font size of legend items
//         },
//       }, 
//     },
//   };
  

//   // Income PIE chart:
//   const incomePieData = sortedTransactions.filter((transaction) => {
//     if (transaction.type === 'income') {
//       return {
//         tag: transaction.tag,
//         amount: transaction.amount,
//       };
//     }
//   });

//   let finalIncomePieData = incomePieData.reduce((acc, obj) => {
//     let key = obj.tag;
//     if (!acc[key]) {
//       acc[key] = {
//         tag: obj.tag,
//         amount: obj.amount,
//       };
//     } else {
//       acc[key].amount += obj.amount;
//     }
//     return acc;
//   }, {});

//   const incomePieChartConfig = {
//     data: Object.values(finalIncomePieData),
//     width: 500,
//     angleField: 'amount',
//     colorField: 'tag',
//     radius: 0.8, // Adjust the value to control the size of the donut
//     innerRadius: 0.6, // Adjust the value to control the size of the hole in the donut
//     legend: {
//       position: 'bottom',// Set the legend position to 'bottom'
//       marker: {
//         symbol: 'hexagon', // Set the legend item's shape to 'square' (you can use 'circle', 'rect', etc.)
//       },
//       itemName: {
//         style: {
//           fontSize: 19, // Adjust the font size of legend items
//         },
//       }, 
//     },
//   };

//   return (
//     <div className="charts-wrapper">
//       <div className="lineChart">
//         {/*buttons to switch between all, income, and expense */}
//         <div className="buttonData">
//           <button
//             onClick={() => updateLineChart('all')}
//             className={dataType === 'all' ? 'active' : ''}
//           >
//             All Transactions
//           </button>
//           <button
//             onClick={() => updateLineChart('income')}
//             className={dataType === 'income' ? 'active' : ''}
//           >
//             Income
//           </button>
//           <button
//             onClick={() => updateLineChart('expense')}
//             className={dataType === 'expense' ? 'active' : ''}
//           >
//             Expense
//           </button>
//         </div>

//         {/* Render Line chart with the updated data and color */}
//         <div className="lineChartSetUp">
//           <Line {...lineChartConfig} />
//         </div>
//       </div>

//       <div className="pieChart">

//         <div className="buttonPieData">
//           <p>{pieChartType === 'expense' ? 'Expense Pie Chart' : 'Income Pie Chart'}</p>
//           <button 
//             className='piChartBtn'
//             onClick={() => setPieChartType(pieChartType === 'expense' ? 'income' : 'expense')}
//           >
//             Switch
//           </button>
//         </div>

//         {pieChartType === 'expense' ? (
//           <Pie {...expensePieChartConfig} />
//         ) : (
//           <Pie {...incomePieChartConfig} />
//         )}
//         {/* Toggle button to switch between Expense and Income Pie charts */}
        
//       </div>
//     </div>
//   );
// }

// export default ChartComponent;

//---------------------------------------------------------------------------------------- 

import React, { useState } from 'react';
import { Line,Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import './style.css';

function ChartComponent({ sortedTransactions }) {

  const colorPalette = ['#ff0000', '#9ACD32', '#0000FF'];
  const [dataType, setDataType] = useState('all');
  const [pieChartType, setPieChartType] = useState('expense');

  // Extracting dates and amounts for all transactions
  const allTransactionData = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

    // Extracting dates and amounts for all income transactions
  const allIncomeData = sortedTransactions
    .filter((transaction) => transaction.type === 'income')
    .map((transaction) => ({
      date: transaction.date,
      amount: transaction.amount,
    }));

  // Extracting dates and amounts for all expense transactions
  const allExpenseData = sortedTransactions
    .filter((transaction) => transaction.type === 'expense')
    .map((transaction) => ({
      date: transaction.date,
      amount: transaction.amount,
    }));

  // Function to update Line chart data based on type
  const updateLineChart = (type) => {
    setDataType(type);
  };

  // Determine which data to use based on dataType
  let chartData;
  switch (dataType) {
    case 'all':
      chartData = allTransactionData;
      break;
    case 'income':
      chartData = allIncomeData;
      break;
    case 'expense':
      chartData = allExpenseData;
      break;
    default:
      break;
  }

  const data = {
    labels: chartData.map((data)=>data.date),
    datasets: [{
        label: 'Chart Data',
        data: chartData.map((data)=>data.amount),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
  };
  const config = {
      type: 'line',
      data: data,
  };

  // Pie chart
  const expensePieData = sortedTransactions
    .filter((transaction) => transaction.type === 'expense');

  const finalExpensePieData = expensePieData.reduce((acc, obj) => {
    const key = obj.tag;
    acc[key] = (acc[key] || 0) + obj.amount;
    return acc;
  }, {});

  const labels = Object.keys(finalExpensePieData);
  const dynamicColors = Array.from({ length: labels.length }, (_, index) => {
    const hue = (index * 137.508) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  });

  const dataPie = {
    labels: labels,
    datasets: [{
      data: Object.values(finalExpensePieData),
      backgroundColor: dynamicColors,
      hoverOffset: 4
    }]
  };

  const configPie = {
    type: 'doughnut',
    data: dataPie,
  };

  // Income PIE chart:
  const incomePieData = sortedTransactions
  .filter((transaction) => transaction.type === 'income');

  const finalIncomePieData = incomePieData.reduce((acc, obj) => {
    const key = obj.tag;
    acc[key] = (acc[key] || 0) + obj.amount;
    return acc;
  }, {});

  const labels2 = Object.keys(finalIncomePieData);

  const dataPieIncome = {
    labels: labels2,
    datasets: [{
      data: Object.values(finalIncomePieData),
      backgroundColor: dynamicColors,
      hoverOffset: 4
    }]
  };

  const configPieIncome = {
    type: 'doughnut',
    data: dataPie,
  };

  


  return (
    <div className="charts-wrapper">
      <div className="lineChart">
        {/*buttons to switch between all, income, and expense */}
      <div className="buttonData">
        <button
          onClick={() => updateLineChart('all')}
          className={dataType === 'all' ? 'active' : ''}
        >
          All Transactions
        </button>
        <button
          onClick={() => updateLineChart('income')}
          className={dataType === 'income' ? 'active' : ''}
        >
          Income
        </button>
        <button
          onClick={() => updateLineChart('expense')}
          className={dataType === 'expense' ? 'active' : ''}
        >
          Expense
        </button>
      </div>

        {/* Render Line chart with the updated data and color */}
        <div className="lineChartSetUp">
          <Line data={data} options={config} />
        </div>
      </div>

      <div className='pieChart'>

          <div className="buttonPieData">
            <p>{pieChartType === 'expense' ? 'Expense Pie Chart' : 'Income Pie Chart'}</p>
            <button 
              className='piChartBtn'
              onClick={() => setPieChartType(pieChartType === 'expense' ? 'income' : 'expense')}
            >
              Switch
            </button>
          </div>  

            {pieChartType === 'expense' ? (
              <Doughnut data={dataPie} options={configPie} />
            ) : (
              <Doughnut data={dataPieIncome} options={configPieIncome} />
            )}
        </div>
    </div>
  );
}

export default ChartComponent;




