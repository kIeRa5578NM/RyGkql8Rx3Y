// 代码生成时间: 2025-09-06 19:59:09
// csvBatchProcessor.js
// A program to process multiple CSV files using Ember.js framework.

import Ember from 'ember';
import Papa from 'papaparse'; // PapaParse is a powerful CSV parsing library
import Fs from 'fs';
import Path from 'path';

const {
  Service,
  inject: { service },
  on
} = Ember;

export default Service.extend({
  
  // Injects the file system service for file operations
  fileSystem: service(),

  // Function to process a single CSV file
  processSingleFile(filePath) {
    return new Promise((resolve, reject) => {
      Fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        
        // Use PapaParse to parse the CSV data
        Papa.parse(data, {
          header: true,
          complete: (results) => {
            resolve(results.data);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    });
  },

  // Function to process multiple CSV files
  processMultipleFiles(directoryPath) {
    return new Promise((resolve, reject) => {
      // Read all files in the directory
      Fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        
        const promises = files.map(file => {
          const fullPath = Path.join(directoryPath, file);
          
          // Check if the file is a CSV file
          if (Path.extname(file) === '.csv') {
            return this.processSingleFile(fullPath);
          }
          
          // Ignore non-CSV files
          return Promise.resolve([]);
        });
        
        // Wait for all file processing promises to resolve
        Promise.all(promises).then(results => {
          resolve([].concat(...results)); // Flatten the array of arrays
        }, reject);
      });
    });
  },

  // Function to save processed data back to CSV
  saveDataToCsv(data, outputPath) {
    return new Promise((resolve, reject) => {
      Papa.unparse(data, {
        newline: '',
        quote: '"',
        header: true,
        quotes: true,
      }, (error, output) => {
        if (error) {
          reject(error);
          return;
        }
        
        Fs.writeFile(outputPath, output, 'utf8', err => {
          if (err) {
            reject(err);
            return;
          }
          resolve(outputPath);
        });
      });
    });
  },

  // Function to process all CSV files in a directory and save the data to a new CSV file
  processAndSave(directoryPath, outputPath) {
    this.processMultipleFiles(directoryPath)
      .then(data => this.saveDataToCsv(data, outputPath))
      .catch(error => {
        console.error('An error occurred:', error);
      });
  },

  // Observer to automatically process files when added to the directory
  processOnAdd: on('init', function() {
    // This would be setup with a more advanced file system watcher in a real application
    // This is a placeholder to illustrate the concept
    // Fs.watch(directoryPath, (eventType, filename) => {
    //   if (eventType === 'rename' && filename) {
    //     this.processSingleFile(Path.join(directoryPath, filename));
    //   }
    // });
  })
});
