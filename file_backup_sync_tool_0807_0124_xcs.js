// 代码生成时间: 2025-08-07 01:24:23
import Ember from 'ember';
import RSVP from 'rsvp';
import fs from 'fs';
import path from 'path';

// 定义一个服务用于文件备份和同步
const { Service } = Ember;

export default Service.extend({
  
  // 备份文件
  backupFile(sourcePath, backupPath) {
    return new RSVP.Promise((resolve, reject) => {
      fs.copyFile(sourcePath, backupPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(`File backed up successfully from ${sourcePath} to ${backupPath}`);
        }
      });
    });
  },

  // 同步目录
  syncDirectories(sourceDir, targetDir) {
    return new RSVP.Promise((resolve, reject) => {
      fs.readdir(sourceDir, (err, files) => {
        if (err) {
          reject(err);
        } else {
          let syncPromises = files.map(file => {
            let sourceFilePath = path.join(sourceDir, file);
            let targetFilePath = path.join(targetDir, file);
            return this.backupFile(sourceFilePath, targetFilePath);
          });
          RSVP.all(syncPromises).then(
            () => {
              resolve('Directories synchronized successfully');
            },
            err => {
              reject(err);
            }
          );
        }
      });
    });
  },

  // 初始化备份和同步工具
  init() {
    // 可以在这里添加初始化代码，如检查目录存在性等
    console.log('File backup and sync tool initialized');
  }
});


// 使用示例
// 假设有一个服务实例 named 'fileBackupSync'
// fileBackupSync.backupFile('/path/to/source', '/path/to/backup').then(
//   result => console.log(result),
//   error => console.error(error)
// );

// fileBackupSync.syncDirectories('/path/to/sourceDir', '/path/to/targetDir').then(
//   result => console.log(result),
//   error => console.error(error)
// );