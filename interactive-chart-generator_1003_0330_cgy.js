// 代码生成时间: 2025-10-03 03:30:22
 * interactive-chart-generator.js
 * A program that creates an interactive chart based on user input using Ember framework.
 *
 * Features:
 * - Accepts user input for chart type and data.
 * - Displays an interactive chart based on the input.
 * - Error handling for invalid inputs.
 */

import Ember from 'ember';
import Chart from 'chart.js';

// Define the InteractiveChart component.
export default Ember.Component.extend({
  // The default chart type is bar chart.
  chartType: 'bar',

  // The data for the chart.
  chartData: null,

  // Initialize the chart when the component is rendered.
  didRender() {
    this.initChart();
  },

  // Initialize the chart with the given data and type.
  initChart() {
    if (!this.chartData) {
      throw new Error('Chart data is not provided.');
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: this.chartType,
      data: this.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  },

  // Action handlers for user input.
  actions: {
    // Handle chart type changes.
    changeChartType(newType) {
      this.set('chartType', newType);
      this.initChart();
    },
    
    // Handle chart data changes.
    changeChartData(newData) {
      this.set('chartData', newData);
      this.initChart();
    },
  },

  // Observer to re-initialize the chart when the data changes.
  chartDataDidChange: Ember.observer('chartData', function() {
    this.initChart();
  }),

  // Ensure the chart is updated when the component is updated.
  willDestroyElement() {
    this._super(...arguments);
    this.chartData = null;
  },
});