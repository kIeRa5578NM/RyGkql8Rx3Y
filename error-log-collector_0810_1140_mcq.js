// 代码生成时间: 2025-08-10 11:40:45
import Ember from 'ember';

// Define the ErrorLogService
export default Ember.Service.extend({

  // Initialize an array to store error logs
  errorLogs: Ember.A([]),

  // Method to log errors
  logError(error) {
    try {
      // Validate the error object
      if (!error || typeof error !== 'object') {
        throw new Error('Invalid error object passed to logError');
      }

      // Append the error to the error logs array
      this.get('errorLogs').pushObject(error);

      // Optionally, implement error handling logic here, e.g., send error to server
      // this.sendErrorToServer(error);

    } catch (e) {
      // Handle any errors that occur during the logging process
      console.error('Error logging error:', e);
    }
  },

  // Method to clear all error logs
  clearLogs() {
    this.set('errorLogs', Ember.A([]));
  },

  // Optionally, implement a method to send error logs to a server
  // sendErrorToServer(error) {
  //   // Implement server communication logic here
  // },

  // Optionally, implement a method to save error logs to local storage
  // saveLogsToLocalStorage() {
  //   const logs = JSON.stringify(this.get('errorLogs'));
  //   localStorage.setItem('errorLogs', logs);
  // },

  // Optionally, implement a method to load error logs from local storage
  // loadLogsFromLocalStorage() {
  //   const logs = localStorage.getItem('errorLogs');
  //   if (logs) {
  //     this.set('errorLogs', JSON.parse(logs));
  //   }
  // },

  // Optionally, implement a method to export error logs for further analysis
  // exportLogs() {
  //   return this.get('errorLogs').slice();
  // },

  // Optionally, implement a method to check if there are any error logs
  // hasLogs: Ember.computed('errorLogs.[]', function() {
  //   return this.get('errorLogs.length') > 0;
  // }),

  // Optionally, implement a method to get the first error log
  // firstError: Ember.computed('errorLogs.[]', function() {
  //   return this.get('errorLogs.firstObject');
  // }),

  // Optionally, implement a method to get the last error log
  // lastError: Ember.computed('errorLogs.[]', function() {
  //   return this.get('errorLogs.lastObject');
  // }),

  // Initialize the service, optionally load logs from local storage or server
  init() {
    this._super(...arguments);
    // this.loadLogsFromLocalStorage();
  },

});