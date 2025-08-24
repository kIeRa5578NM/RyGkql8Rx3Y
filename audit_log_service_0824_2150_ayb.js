// 代码生成时间: 2025-08-24 21:50:27
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { runInDebug } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/*
 * AuditLogService handles the logging of security audit events.
 * It provides methods to create and retrieve audit logs.
 */
export default class AuditLogService extends Service {
  @service store; // Injecting the service to interact with the application's data persistence layer

  // The array to hold audit logs
  @tracked auditLogs = A();

  /*
   * Creates a new audit log entry with the provided details and stores it.
   * @param {object} logDetails - The details of the audit log entry.
   * @param {string} logDetails.userId - The ID of the user who initiated the action.
   * @param {string} logDetails.action - The type of action performed.
   * @param {string} logDetails.timestamp - The timestamp of when the action occurred.
   * @param {string} logDetails.details - Additional details about the action.
   * @returns {Promise} - A promise that resolves with the created audit log entry.
   */
  @action
  async createAuditLog(logDetails) {
    try {
      // Validate log details
      if (!logDetails.userId || !logDetails.action || !logDetails.timestamp || !logDetails.details) {
        throw new Error('Invalid audit log details provided.');
      }

      // Create a new audit log entry
      const auditLogEntry = this.store.createRecord('audit-log', logDetails);

      // Save the audit log entry
      await auditLogEntry.save();

      // Add the new entry to the local array for quick access
      this.auditLogs.addObject(auditLogEntry);

      return auditLogEntry;
    } catch (error) {
      runInDebug(() => {
        console.error('Error creating audit log:', error);
      });
      throw error;
    }
  }

  /*
   * Retrieves all audit logs from the persistence layer.
   * @returns {Promise} - A promise that resolves with an array of audit logs.
   */
  @action
  async getAllAuditLogs() {
    try {
      // Fetch all audit logs from the store
      const allLogs = await this.store.findAll('audit-log');

      // Update the local array with the fetched logs
      this.auditLogs = A(allLogs.toArray());

      return allLogs;
    } catch (error) {
      runInDebug(() => {
        console.error('Error retrieving audit logs:', error);
      });
      throw error;
    }
  }

  /*
   * Retrieves audit logs for a specific user.
   * @param {string} userId - The ID of the user.
   * @returns {Promise} - A promise that resolves with an array of audit logs for the user.
   */
  @action
  async getAuditLogsForUser(userId) {
    try {
      // Fetch audit logs for the specified user from the store
      const userLogs = await this.store.query('audit-log', { userId });

      return userLogs;
    } catch (error) {
      runInDebug(() => {
        console.error('Error retrieving audit logs for user:', error);
      });
      throw error;
    }
  }

  /*
   * Removes an audit log from the persistence layer and the local array.
   * @param {object} logEntry - The audit log entry to be removed.
   * @returns {Promise} - A promise that resolves when the log entry is removed.
   */
  @action
  async removeAuditLog(logEntry) {
    try {
      // Remove the log entry from the local array
      this.auditLogs.removeObject(logEntry);

      // Delete the log entry from the persistence layer
      await logEntry.destroyRecord();
    } catch (error) {
      runInDebug(() => {
        console.error('Error removing audit log:', error);
      });
      throw error;
    }
  }
}
