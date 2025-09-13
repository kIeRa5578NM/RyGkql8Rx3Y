// 代码生成时间: 2025-09-13 11:00:49
import EmberObject, { observer } from '@ember/object';
import { A } from '@ember/array';
import { computed } from '@ember/object/computed';
import { run } from '@ember/runloop';
import { isNone } from '@ember/utils';

/**
 * TimerScheduler Class
 * Handles scheduling of tasks with a given interval.
 */
export default class TimerScheduler extends EmberObject {
  // An array to store scheduled tasks
  tasks = A();

  // Start a new task
  startTask(interval, callback) {
    if (isNone(interval) || isNone(callback)) {
      throw new Error('Interval and callback must be provided for a new task');
    }

    const task = run.later(() => {
      callback();
      this.startTask(interval, callback); // Recur until task is stopped
    }, interval);

    this.tasks.pushObject({
      interval,
      callback,
      task
    });
  }

  // Stop a task by its callback reference
  stopTask(callback) {
    this.tasks = this.tasks.filter(task => {
      if (task.callback === callback) {
        run.cancel(task.task);
        return false;
      }
      return true;
    });
  }

  // Stops all tasks
  stopAllTasks() {
    this.tasks.forEach(task => run.cancel(task.task));
    this.tasks.clear();
  }
}

// Note: This is a simplistic timer scheduler implementation.
// Error handling is minimal for brevity, and tasks are not guaranteed to run in exact intervals.
// For production, consider using more robust scheduling solutions or libraries.
