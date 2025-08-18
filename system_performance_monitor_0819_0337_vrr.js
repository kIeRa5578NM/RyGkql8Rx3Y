// 代码生成时间: 2025-08-19 03:37:31
import Ember from 'ember';

// Define a service to handle performance data
export default Ember.Service.extend({
  
  // This property will store the system performance data
  performanceData: null,

  /**
   * Method to fetch system performance data
   * @returns {Promise} - A promise that resolves with system performance data
   */
  fetchPerformanceData: function() {
    try {
      // Simulating fetching performance data from an API or system
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock performance data
          const mockPerformanceData = {
            cpuUsage: 20,
            memoryUsage: 50,
            diskUsage: 70,
          };

          // Resolve the promise with the mock data
          resolve(mockPerformanceData);
        }, 1000);
      });
    } catch (error) {
      // Handle any errors that occur during data fetching
      console.error('Error fetching performance data:', error);
      throw error;
    }
  },

  /**
   * Method to update the performance data
   * @returns {void}
   */
  updatePerformanceData: function() {
    this.fetchPerformanceData().then((data) => {
      this.set('performanceData', data);
    }).catch((error) => {
      // Handle any errors during data update
      console.error('Error updating performance data:', error);
    });
  },

  /**
   * Method to get the current system performance data
   * @returns {Object} - The current system performance data
   */
  getPerformanceData: function() {
    return this.get('performanceData');
  },

  // Initialize the service and update performance data on initialization
  init() {
    this._super(...arguments);
    this.updatePerformanceData();
  },
});