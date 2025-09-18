// 代码生成时间: 2025-09-19 07:29:18
 * It follows best practices and includes error handling and comments for maintainability and scalability.
 */

import Ember from 'ember';
import XLSX from 'xlsx'; // Importing the xlsx library for Excel file generation

export default Ember.Service.extend({
  
  /**
   * Generates an Excel file based on the provided data and saves it to the client's machine.
   *
   * @param {Array} data - The data to populate the Excel file with.
   * @param {String} filename - The desired filename for the Excel file.
   * @param {String} sheetName - The name of the sheet in the Excel file.
   */
  generateExcel(data, filename, sheetName) {
    try {
      // Create a new Excel workbook and add a worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      // Generate the Excel file and save it to the client's machine
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      // Handle any errors that occur during the generation process
      console.error('Error generating Excel file:', error);
      throw new Error('Failed to generate Excel file: ' + error.message);
    }
  },

  /**
   * Helper function to prepare the data for Excel file generation.
   *
   * @param {Array} rawData - The raw data to be transformed into Excel-compatible format.
   * @returns {Array} - The transformed data ready for Excel file generation.
   */
  prepareDataForExcel(rawData) {
    // Implement any data transformation logic here if needed
    // For now, simply return the rawData as it is
    return rawData;
  }
});