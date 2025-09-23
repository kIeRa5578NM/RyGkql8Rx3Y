// 代码生成时间: 2025-09-23 19:13:29
import Ember from 'ember';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember-decorators/service';

// Importing necessary libraries for encryption and decryption
import CryptoJS from 'crypto-js';

export default class PasswordEncryptionUtility extends Ember.Component {
  @tracked password = ''; // Tracked property for password input
  @tracked encryptedPassword = ''; // Tracked property for encrypted password output
  @tracked decryptedPassword = ''; // Tracked property for decrypted password output
  @service encryptionService; // Injecting encryption service

  // Method to encrypt the password
  *@action encryptPassword() {
    try {
      if (this.password) {
        this.encryptedPassword = CryptoJS.AES.encrypt(this.password, 'my-secret-key').toString();
      }
    } catch (error) {
      console.error('Error encrypting password:', error);
    }
  }

  // Method to decrypt the password
  *@action decryptPassword() {
    try {
      if (this.encryptedPassword) {
        const bytes = CryptoJS.AES.decrypt(this.encryptedPassword, 'my-secret-key');
        this.decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      }
    } catch (error) {
      console.error('Error decrypting password:', error);
    }
  }
}
