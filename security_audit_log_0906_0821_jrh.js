// 代码生成时间: 2025-09-06 08:21:31
import EmberObject from '@ember/object';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';

// 定义审计日志记录器服务
export default class SecurityAuditLogger extends EmberObject.extend({
  // 注入日志存储服务
  logStorage: service(),

  // 初始化审计日志存储
  init() {
    super.init(...arguments);
    this.set('logs', A());
  },

  // 添加审计日志记录
  addLogEntry(logEntry) {
    try {
      if (isEmpty(logEntry)) {
        throw new Error('Log entry cannot be empty.');
      }

      // 将日志记录添加到数组
      this.get('logs').pushObject(logEntry);
      // 持久化日志记录到存储服务
      this.get('logStorage').saveLog(logEntry);
    } catch (error) {
      console.error('Error adding log entry:', error);
    }
  },

  // 获取所有审计日志记录
  getAllLogs() {
    try {
      return this.get('logStorage').getAllLogs();
    } catch (error) {
      console.error('Error retrieving all logs:', error);
      return [];
    }
})

// 定义日志存储服务
export class LogStorageService extends Service {
  logs = A();

  // 保存日志记录
  saveLog(logEntry) {
    this.get('logs').pushObject(logEntry);
  },

  // 获取所有日志记录
  getAllLogs() {
    return this.get('logs').slice();
  }
}

// 使用示例
// let auditLogger = SecurityAuditLogger.create();
// auditLogger.addLogEntry({
//   user: 'username',
//   timestamp: new Date(),
//   action: 'login',
//   result: 'success'
// });
// console.log(auditLogger.getAllLogs());