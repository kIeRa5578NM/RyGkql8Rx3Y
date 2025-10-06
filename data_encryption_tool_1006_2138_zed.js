// 代码生成时间: 2025-10-06 21:38:53
// Import necessary Ember modules and CryptoJS
import Ember from 'ember';
import CryptoJS from 'crypto-js';

export default Ember.Component.extend({
  // Default properties
  encryptedData: null,
  decryptedData: null,
  error: null,

  // Actions
  actions: {
    // Encrypt data action
    encryptData() {
      try {
        // Get the data to be encrypted from the input field
        const plainText = this.get('plainText');

        // Encrypt the data using AES encryption from CryptoJS
        const encrypted = CryptoJS.AES.encrypt(plainText, this.get('encryptionKey')).toString();

        // Set the encrypted data property
        this.set('encryptedData', encrypted);
      } catch (error) {
        // Handle any errors that occur during encryption
        this.set('error', `Encryption Error: ${error.message}`);
      }
    },
    
    // Decrypt data action
    decryptData() {
      try {
        // Get the encrypted data and encryption key
        const encryptedText = this.get('encryptedData');
        const encryptionKey = this.get('encryptionKey');

        // Decrypt the data using AES decryption from CryptoJS
        const decrypted = CryptoJS.AES.decrypt(encryptedText, encryptionKey).toString(CryptoJS.enc.Utf8);

        // Set the decrypted data property
        this.set('decryptedData', decrypted);
      } catch (error) {
        // Handle any errors that occur during decryption
        this.set('error', `Decryption Error: ${error.message}`);
      }
    }
  },

  // Computed property to validate encryption key
  isValidEncryptionKey: Ember.computed('encryptionKey', function() {
    const encryptionKey = this.get('encryptionKey');
    return encryptionKey && encryptionKey.length > 0;
  }),

  // Lifecycle hook to reset properties when the component is destroyed
  willDestroyElement() {
    this._super(...arguments);
    this.setProperties({
      encryptedData: null,
      decryptedData: null,
      error: null
    });
  }
});