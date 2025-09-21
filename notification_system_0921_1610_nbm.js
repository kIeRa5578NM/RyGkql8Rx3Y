// 代码生成时间: 2025-09-21 16:10:37
import Ember from 'ember';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { A } from '@ember/array';

// Define the Notification class to encapsulate notification data
class Notification {
  constructor(message, duration) {
    this.message = message;
    this.duration = duration;
    this.isVisible = true;
  }

  // Hide the notification after a specified duration
  hide() {
    later(() => {
      this.isVisible = false;
    }, this.duration);
  }
}

// Define the main NotificationService class
export default class NotificationService extends Ember.Service {
  @tracked notifications = A();

  @action
  // Method to create and display a new notification
  createNotification(message, duration = 5000) {
    try {
      // Create a new notification instance
      const notification = new Notification(message, duration);
      // Add the notification to the notifications array
      this.notifications.push(notification);
      // Automatically hide the notification after the duration
      notification.hide();
    } catch (error) {
      // Handle any errors that occur during notification creation
      console.error('Error creating notification:', error);
    }
  }

  // Method to remove a notification from the array
  removeNotification(notification) {
    this.notifications.removeObject(notification);
  }
}
