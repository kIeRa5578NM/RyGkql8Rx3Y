// 代码生成时间: 2025-08-01 07:59:00
 * This program provides a simple interface to rename multiple files in a directory.
 * It handles errors and follows JavaScript best practices.
 *
 * Features:
 * - Rename files based on user input
 * - Error handling
 * - Maintainability and extensibility
 */

/**
 * @module batchFileRenameTool
 */

import Ember from 'ember';
import fs from 'fs';
import path from 'path';

// Ember Service to handle file renaming
export default Ember.Service.extend({
  
  /**
   * Renames files in a directory based on a given pattern and replacement.
   *
   * @param {string} directoryPath - The path to the directory containing files to rename.
   * @param {string} pattern - The pattern to search for in the file names.
   * @param {string} replacement - The string to replace the pattern with.
   * @returns {Promise} - A promise that resolves after all files have been renamed.
   */
  renameFiles(directoryPath, pattern, replacement) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject(err);
          return;
        }

        let renamePromises = files.map(file => {
          return new Ember.RSVP.Promise((fileResolve, fileReject) => {
            let oldPath = path.join(directoryPath, file);
            let newPath = oldPath.replace(pattern, replacement);

            fs.rename(oldPath, newPath, err => {
              if (err) {
                fileReject(err);
              } else {
                fileResolve();
              }
            });
          });
        });

        Ember.RSVP.allSettled(renamePromises).then(results => {
          let errors = results.filter(result => result.state === 'rejected');

          if (errors.length > 0) {
            reject(new Error("There were errors renaming some files."));
          } else {
            resolve();
          }
        });
      });
    });
  }
});
