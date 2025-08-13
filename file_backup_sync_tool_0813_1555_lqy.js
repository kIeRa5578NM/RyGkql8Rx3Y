// 代码生成时间: 2025-08-13 15:55:13
// Import necessary modules and dependencies
import Ember from 'ember';
import RSVP from 'rsvp';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import crypto from 'crypto';

/*
 * Constants
 */
const LOCAL_STORAGE_PATH = './local-storage';
const REMOTE_STORAGE_URL = 'https://your-remote-storage-url.com';
const SYNC_INTERVAL = 60000; // Sync interval in milliseconds

/*
 * Services
 */
// File Backup Service
export default Ember.Service.extend({
  
  // Initialize the service
  init() {
    this._super(...arguments);
    this.setupSync();
  },

  // Setup the sync process
  setupSync() {
    Ember.run.later(() => {
      this.syncFiles();
    }, SYNC_INTERVAL);
  },

  // Sync files between local and remote storage
  syncFiles() {
    RSVP.hash({
      localFiles: this.getLocalFiles(),
      remoteFiles: this.getRemoteFiles()
    }).then(({ localFiles, remoteFiles }) => {
      this.syncLocalAndRemote(localFiles, remoteFiles);
    }).catch(error => {
      console.error('Error syncing files:', error);
    });
  },

  // Get local files
  getLocalFiles() {
    return new RSVP.Promise((resolve, reject) => {
      fs.readdir(LOCAL_STORAGE_PATH, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
  },

  // Get remote files
  getRemoteFiles() {
    return axios.get(`${REMOTE_STORAGE_URL}/files`).then(response => response.data).catch(error => {
      throw error;
    });
  },

  // Sync local and remote files
  syncLocalAndRemote(localFiles, remoteFiles) {
    localFiles.forEach(localFile => {
      const localFilePath = path.join(LOCAL_STORAGE_PATH, localFile);
      const remoteFileHash = remoteFiles.find(file => file.name === localFile)?.hash;

      // Compare local and remote file hashes
      const localFileHash = crypto.createHash('sha256').update(fs.readFileSync(localFilePath)).digest('hex');
      if (remoteFileHash !== localFileHash) {
        this.uploadFile(localFilePath);
      }
    });

    remoteFiles.forEach(remoteFile => {
      const localFileExists = localFiles.includes(remoteFile.name);
      if (!localFileExists) {
        this.downloadFile(remoteFile);
      }
    });
  },

  // Upload a file to remote storage
  uploadFile(filePath) {
    const file = fs.readFileSync(filePath);
    const fileStream = fs.createReadStream(filePath);

    return axios.post(`${REMOTE_STORAGE_URL}/upload`, fileStream, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }).then(() => {
      console.log(`File uploaded: ${filePath}`);
    }).catch(error => {
      console.error(`Error uploading file: ${filePath}`, error);
    });
  },

  // Download a file from remote storage
  downloadFile(remoteFile) {
    const localFilePath = path.join(LOCAL_STORAGE_PATH, remoteFile.name);
    const writer = fs.createWriteStream(localFilePath);

    return axios.get(`${REMOTE_STORAGE_URL}/download/${remoteFile.name}`, {
      responseType: 'stream'
    }).then(response => {
      response.data.pipe(writer);
      writer.on('finish', () => {
        console.log(`File downloaded: ${localFilePath}`);
      });
    }).catch(error => {
      console.error(`Error downloading file: ${remoteFile.name}`, error);
    });
  }
});