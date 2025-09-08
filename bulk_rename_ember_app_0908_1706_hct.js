// 代码生成时间: 2025-09-08 17:06:02
import Ember from 'ember';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { Promise } from 'rsvp';
import fs from 'fs';
import path from 'path';

export default Ember.Component.extend({
  // Service to handle file operations
  fileService: service('file'),

  // Array to hold the list of files
  files: A([]),

  // Placeholder for the new file name pattern
  newPattern: '',

  // Placeholder for the file renaming errors
  errors: A([]),

  init() {
    this._super(...arguments);
    this.get('files').clear();
  },

  /**
   * Computed property to check if any files are selected
   * @return {boolean}
   */
  hasFiles: computed('files.[]', function() {
    return !isEmpty(this.get('files'));
  }),

  /**
   * Method to handle file selection
   */
  selectFiles() {
    const fileInput = document.getElementById('file-input');
    const files = fileInput.files;
    let selectedFiles = Array.from(files).map(file => {
      return {
        name: file.name,
        fullPath: path.join(process.cwd(), file.path),
      };
    });
    this.set('files', this.get('files').concat(selectedFiles));
  },

  /**
   * Method to handle file renaming
   * @return {Promise}
   */
  renameFiles() {
    let promises = this.get('files').map((file) => {
      return new Promise((resolve, reject) => {
        fs.rename(file.fullPath, path.join(file.fullPath, this.get('newPattern')))
          .then(() => resolve(file.name + ' renamed successfully.'))
          .catch((error) => reject(error.message));
      });
    });
    return Promise.all(promises).then(results => {
      results.forEach(result => {
        console.log(result);
      });
    }).catch(error => {
      this.set('errors', A([error]));
    });
  },

  /**
   * Actions to be handled
   */
  actions: {
    selectFilesAction() {
      this.selectFiles();
    },
    renameFilesAction() {
      this.renameFiles();
    },
  },
});
