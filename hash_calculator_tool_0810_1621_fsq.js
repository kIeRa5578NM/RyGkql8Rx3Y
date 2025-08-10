// 代码生成时间: 2025-08-10 16:21:09
// hash_calculator_tool.js
// This Ember application provides a hash calculation tool.

import Ember from 'ember';
import { hash } from 'rsvp';

export default Ember.Component.extend({
  // Input text for hash calculation
  inputText: '',

  // Output hash value
  hashValue: null,

  // Hash algorithm to be used
  hashAlgorithm: 'md5',

  // Error message when hash calculation fails
  errorMessage: null,

  // Compute the hash of the input text using the selected algorithm
  computeHash() {
    try {
      const algorithm = this.get('hashAlgorithm');
      const inputText = this.get('inputText');

      if (!inputText) {
        this.set('errorMessage', 'Please enter some text to calculate its hash.');
        return;
      }

      // Use the crypto library to compute the hash
      const hashResult = hash(inputText, algorithm);

      // Set the computed hash value
      this.set('hashValue', hashResult);
      this.set('errorMessage', null);
    } catch (error) {
      // Handle any errors that occur during hash calculation
      this.set('errorMessage', `Error calculating hash: ${error.message}`);
      this.set('hashValue', null);
    }
  },

  // Actions to perform when the input text changes or the compute button is clicked
  actions: {
    onChangeInput(event) {
      this.set('inputText', event.target.value);
    },

    onComputeButtonClick() {
      this.computeHash();
    }
  }
});