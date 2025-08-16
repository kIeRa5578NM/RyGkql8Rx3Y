// 代码生成时间: 2025-08-17 01:14:00
import Ember from 'ember';

export default Ember.Component.extend({
  // The URL to be validated
  urlToValidate: null,

  // Validate the URL format
  validateUrl: function(url) {
    try {
      // Use the URL constructor to check if the URL is valid
      new URL(url);
      // If no error thrown, URL is valid
      return true;
    } catch (error) {
      // If an error is thrown, URL is invalid
      return false;
    }
  },

  // Actions for the component
  actions: {
    // Action to handle the URL input
    onUrlInput(url) {
      this.set('urlToValidate', url);
    },

    // Action to check the validity of the URL
    checkUrlValidity() {
      const isValid = this.validateUrl(this.get('urlToValidate'));
      if (isValid) {
        this.set('validationMessage', 'URL is valid.');
      } else {
        this.set('validationMessage', 'Invalid URL format.');
      }
    }
  },

  // Computed property to handle validation message
  validationMessage: Ember.computed('urlToValidate', function() {
    return this.validateUrl(this.get('urlToValidate')) ? 'URL is valid.' : 'Invalid URL format.';
  }),
});
