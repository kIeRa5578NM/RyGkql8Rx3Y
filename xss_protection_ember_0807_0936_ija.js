// 代码生成时间: 2025-08-07 09:36:00
import Ember from 'ember';
import DOMPurify from 'dompurify';

// Ember service to handle XSS protection
export default Ember.Service.extend({

    // Sanitize input to prevent XSS attacks
    sanitizeInput(input) {
        try {
            // Use DOMPurify to sanitize the input
            const sanitizedInput = DOMPurify.sanitize(input);
            return sanitizedInput;
        } catch (error) {
            // Log the error and return the input as is (could also throw or handle differently)
            console.error('Error sanitizing input:', error);
            return input;
        }
    },

    // Example method to demonstrate usage of sanitizeInput
    displayUserContent(userContent) {
        // Sanitize user content before displaying it
        const safeContent = this.sanitizeInput(userContent);
        // Display the sanitized content
        // This is a placeholder for where you would actually display the content
        console.log('Displaying sanitized user content:', safeContent);
    },

    // Initialize DOMPurify with additional configuration if needed
    initDOMPurify() {
        DOMPurify.addHook('uponSanitizeElement', (node, data, config) => {
            // Custom sanitization logic can be added here
            // For example, removing certain attributes or tags
            // This is a placeholder for demonstration purposes
            // if (node.tagName === 'SCRIPT') {
            //     node.parentNode.removeChild(node);
            // }
        });
    },

    // This method will be called on service initialization to configure DOMPurify
    initializeDOMPurify() {
        try {
            this.initDOMPurify();
        } catch (error) {
            console.error('Failed to initialize DOMPurify:', error);
        }
    }
});

// Call initializeDOMPurify on service initialization
export default Ember.on('init', Ember.Service, function() {
    this._super(...arguments);
    this.initializeDOMPurify();
});