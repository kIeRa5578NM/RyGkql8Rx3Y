// 代码生成时间: 2025-08-27 13:43:56
 * easily understood, maintained, and expanded.
 */

import Ember from 'ember';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MessageNotificationSystem extends Ember.Component {
  @tracked messages = [];
  @tracked errorMessage = '';

  // Function to add a new message to the notification list
  @action
  addMessage(messageText) {
    try {
      if (!messageText) {
        throw new Error('Message content cannot be empty');
      }
      const newMessage = { id: Date.now(), text: messageText, timestamp: new Date().toISOString() };
      this.messages.pushObject(newMessage);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Function to remove a message from the notification list
  @action
  removeMessage(messageId) {
    const index = this.messages.findIndex(message => message.id === messageId);
    if (index > -1) {
      this.messages.removeAt(index);
    } else {
      this.errorMessage = 'Message not found';
    }
  }

  // Lifecycle hook to clear messages when component is destroyed
  willDestroy() {
    super.willDestroy(...arguments);
    this.messages.clear();
  }

  // Function to display messages in the template
  messagesList() {
    return this.messages.map(message => {
      return `Message: '${message.text}', Timestamp: '${message.timestamp}'`;
    }).join('
');
  }
}
