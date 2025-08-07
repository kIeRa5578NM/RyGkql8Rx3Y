// 代码生成时间: 2025-08-07 18:57:28
 * This tool allows users to compute hash values for strings.
 *
 * @version 1.0.0
 * @author Your Name
 * @date Today's Date
 */

import Ember from 'ember';

export default Ember.Component.extend({
  // State properties
  inputString: '',
  hashValue: null,
  error: null,

  // Actions
  actions: {
    // Action to compute hash
    computeHash() {
      try {
        // Clear any previous errors
        this.set('error', null);

        // Check if the input string is empty
        if (this.get('inputString').trim() === '') {
          throw new Error('Input string cannot be empty.');
        }

        // Compute the hash value (example uses SHA-256 for demonstration)
        const hash = CryptoJS.SHA256(this.get('inputString')).toString();
        this.set('hashValue', hash);
      } catch (error) {
        // Handle any errors that occur during hash computation
        this.set('error', error.message);
      }
    }
  },

  // Compute the hash when the input changes
  inputStringObserver: Ember.observer('inputString', function() {
    // Trigger hash computation on input change
    this.send('computeHash');
  }),

  // Lifecycle hook to reset the hash value when the component is destroyed
  willDestroy() {
    this._super(...arguments);
    this.set('hashValue', null);
  }
});

// Note: CryptoJS library is used for SHA-256 computation.
// Ensure to include the CryptoJS library in your project for this to work.
