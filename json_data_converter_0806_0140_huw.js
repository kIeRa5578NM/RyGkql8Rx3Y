// 代码生成时间: 2025-08-06 01:40:52
import EmberObject from '@ember/object';
import { computed } from '@ember/object';

/**
 * A JSON Data Converter class that handles JSON data format conversion.
 * It provides methods to convert JSON data into other formats or
 * modify its structure based on predefined rules.
 */
export default EmberObject.extend({
  /**
   * Converts JSON data into a more human-readable format.
   *
   * @param {Object} jsonData - The JSON data to be converted.
   * @returns {Object} - The converted JSON data.
   */
  convertToJsonPretty: function(jsonData) {
    try {
      if (typeof jsonData !== 'object' || jsonData === null) {
        throw new Error('Input must be a non-null object.');
      }
      return JSON.stringify(jsonData, null, 2);
    } catch (error) {
      console.error('Error converting JSON to pretty format:', error);
      return null;
    }
  },

  /**
   * Converts JSON data into a specific format based on a given schema.
   *
   * @param {Object} jsonData - The JSON data to be converted.
   * @param {Object} conversionSchema - The schema defining how to convert the data.
   * @returns {Object} - The converted JSON data.
   */
  convertToCustomFormat: function(jsonData, conversionSchema) {
    try {
      if (typeof jsonData !== 'object' || jsonData === null || typeof conversionSchema !== 'object') {
        throw new Error('Both jsonData and conversionSchema must be non-null objects.');
      }
      let convertedData = {};
      for (let key in conversionSchema) {
        if (conversionSchema.hasOwnProperty(key)) {
          let schemaRule = conversionSchema[key];
          let value = jsonData[schemaRule.source] || schemaRule.defaultValue;
          convertedData[schemaRule.target] = value;
        }
      }
      return convertedData;
    } catch (error) {
      console.error('Error converting JSON to custom format:', error);
      return null;
    }
  },

  /**
   * Validates JSON data against a schema.
   *
   * @param {Object} jsonData - The JSON data to be validated.
   * @param {Object} validationSchema - The schema defining validation rules.
   * @returns {Boolean} - Whether the JSON data is valid.
   */
  validateJsonData: function(jsonData, validationSchema) {
    try {
      if (typeof jsonData !== 'object' || jsonData === null || typeof validationSchema !== 'object') {
        throw new Error('Both jsonData and validationSchema must be non-null objects.');
      }
      for (let key in validationSchema) {
        if (!validationSchema.hasOwnProperty(key)) continue;
        let rule = validationSchema[key];
        if (typeof jsonData[key] !== rule.type) {
          console.error(`Invalid type for '${key}': expected ${rule.type}, got ${typeof jsonData[key]}`);
          return false;
        }
        if (rule.required && jsonData[key] === undefined) {
          console.error(`Missing required field: '${key}'`);
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Error validating JSON data:', error);
      return false;
    }
  }
});