// 代码生成时间: 2025-09-15 08:03:57
import Ember from 'ember';
/*
 * A simple Ember service for scheduling timed tasks.
 * This service allows registration of tasks and triggering them at specific times.
 */

export default Ember.Service.extend({
  // A map to store the scheduled tasks
  scheduledTasks: Ember.inject.service(),

  // Register a task with a given name and a function to be executed
  addTask(taskId, taskFunction) {
    // Store the task function in the scheduledTasks service
    this.get('scheduledTasks').add(taskId, taskFunction);
  },

  // Remove a task by its name
  removeTask(taskId) {
    // Remove the task from the scheduledTasks service
    this.get('scheduledTasks').remove(taskId);
  },

  // Execute a task by its name
  executeTask(taskId) {
    try {
      // Get the task function from the scheduledTasks service and execute it
      const taskFunction = this.get('scheduledTasks').get(taskId);
      if (taskFunction) {
        taskFunction();
      } else {
        throw new Error(`Task with ID '${taskId}' not found`);
      }
    } catch (error) {
      // Handle errors during task execution
      console.error(`Error executing task '${taskId}':`, error);
    }
  },

  // Schedule a task to run at a specific time using setTimeout
  scheduleTask(taskId, delay) {
    try {
      // Use setTimeout to schedule the task's execution after the given delay (in ms)
      setTimeout(() => {
        this.executeTask(taskId);
      }, delay);
    } catch (error) {
      // Handle errors during task scheduling
      console.error(`Error scheduling task '${taskId}':`, error);
    }
  },

  // Initialize the scheduler service
  init() {
    this._super(...arguments);
    // Initialize scheduledTasks service if not already done
    if (!this.get('scheduledTasks')) {
      this.set('scheduledTasks', new Map());
    }
  }
});