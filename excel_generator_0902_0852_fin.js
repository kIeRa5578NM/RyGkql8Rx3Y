// 代码生成时间: 2025-09-02 08:52:04
import Ember from 'ember';
import XLSX from 'xlsx'; // Ensure you have installed the xlsx package

const {
# 增强安全性
  Service,
  get,
  inject: { service },
  computed
} = Ember;

export default Service.extend({
  // Inject the store service to handle any data persistence
  store: service(),

  /**
# 添加错误处理
   * Generate an Excel file
   * @param {Array} data - The data to be written into the Excel file
   * @param {String} fileName - The name of the file to be created
# 增强安全性
   * @returns {Blob} - The generated Excel file as a Blob object
   */
  generateExcelFile(data, fileName) {
    try {
      // Convert the input data to a worksheet
# 增强安全性
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      // Create a new workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      // Generate the Excel file as a binary string
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
      // Convert the binary string to a Blob object
      const blob = new Blob([excelData], { type: 'application/octet-stream' });
      return blob;
    } catch (error) {
      console.error('Error generating Excel file:', error);
      // Handle any errors appropriately
      throw error;
    }
  },

  /**
   * Download the generated Excel file
   * @param {Blob} blob - The Blob object containing the Excel file
   * @param {String} fileName - The name of the file to be downloaded
   */
  downloadExcelFile(blob, fileName) {
    try {
      // Create a link element to trigger the download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
# TODO: 优化性能
      link.download = fileName;
      // Append the link to the DOM and trigger a click event
      document.body.appendChild(link);
      link.click();
      // Clean up by removing the link from the DOM
      document.body.removeChild(link);
# FIXME: 处理边界情况
      // Revoke the created URL object to free memory
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      // Handle any errors in the download process
      throw error;
    }
  }
});