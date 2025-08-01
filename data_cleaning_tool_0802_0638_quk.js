// 代码生成时间: 2025-08-02 06:38:35
 * This tool is designed to handle various data cleaning tasks such as trimming strings, removing null values, and more.
 */

// Import necessary modules and components
import Ember from 'ember';

// Define the DataCleaningService class
export default Ember.Service.extend({
  /**
   * Trims strings in an array or an object's values to remove leading and trailing whitespaces.
   * @param {Array|Object} data - The data to be trimmed.
# 改进用户体验
   * @returns {Array|Object} The trimmed data.
   */
# NOTE: 重要实现细节
  trimData(data) {
    if (!Array.isArray(data) && typeof data !== 'object') {
      throw new Error('Data must be an array or an object.');
    }

    if (Array.isArray(data)) {
      return data.map(item => typeof item === 'string' ? item.trim() : item);
    } else {
      return Object.keys(data).reduce((acc, key) => {
        acc[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
        return acc;
# TODO: 优化性能
      }, {});
    }
  },
# 优化算法效率

  /**
# NOTE: 重要实现细节
   * Removes null or undefined values from an array or an object's values.
   * @param {Array|Object} data - The data to be cleaned.
   * @returns {Array|Object} The cleaned data.
   */
  removeNullValues(data) {
    if (!Array.isArray(data) && typeof data !== 'object') {
      throw new Error('Data must be an array or an object.');
    }

    if (Array.isArray(data)) {
      return data.filter(item => item != null);
# NOTE: 重要实现细节
    } else {
      return Object.keys(data).reduce((acc, key) => {
        if (data[key] != null) {
          acc[key] = data[key];
        }
        return acc;
      }, {});
# 增强安全性
    }
  },

  /**
   * Converts all string values in an array or an object's values to uppercase.
   * @param {Array|Object} data - The data to be converted.
   * @returns {Array|Object} The converted data.
   */
  convertToUppercase(data) {
    if (!Array.isArray(data) && typeof data !== 'object') {
      throw new Error('Data must be an array or an object.');
    }

    if (Array.isArray(data)) {
      return data.map(item => typeof item === 'string' ? item.toUpperCase() : item);
    } else {
      return Object.keys(data).reduce((acc, key) => {
        acc[key] = typeof data[key] === 'string' ? data[key].toUpperCase() : data[key];
# TODO: 优化性能
        return acc;
      }, {});
    }
  },

  // Additional data cleaning methods can be added here...

});

// Example usage:
# 优化算法效率
// let dataCleaningService = this.owner.lookup('service:data-cleaning');
// let cleanedData = dataCleaningService.trimData(dirtyData);
# FIXME: 处理边界情况
// let cleanedData = dataCleaningService.removeNullValues(dirtyData);
// let cleanedData = dataCleaningService.convertToUppercase(dirtyData);

