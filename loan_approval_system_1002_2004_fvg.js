// 代码生成时间: 2025-10-02 20:04:44
import Ember from 'ember';
import DS from 'ember-data';

// Define a model for the Loan Application
export default Ember.Controller.extend({
  // Inject the store service to create new loan application records
  store: Ember.inject.service(),

  // Form fields
  loanAmount: null,
  loanTerm: null,
  creditScore: null,
  income: null,

  // Submit the loan application
  actions: {
    submitLoanApplication() {
      try {
        // Validate the form fields
        if (!this.get('loanAmount') || !this.get('loanTerm') || !this.get('creditScore') || !this.get('income')) {
          throw new Error('All fields are required');
        }

        // Create a new loan application record
        const loanApplication = this.get('store').createRecord('loan-application', {
          loanAmount: this.get('loanAmount'),
          loanTerm: this.get('loanTerm'),
          creditScore: this.get('creditScore'),
          income: this.get('income'),
          status: 'pending'
        });

        // Save the new loan application record
        loanApplication.save().then((loanRecord) => {
          this.set('loanAmount', null);
          this.set('loanTerm', null);
          this.set('creditScore', null);
          this.set('income', null);
          this.set('loanApplication', loanRecord);
          Ember.Logger.info(`Loan application submitted with ID: ${loanRecord.get('id')}`);
        }).catch((error) => {
          this.set('error', error);
          Ember.Logger.error(`Error submitting loan application: ${error.message}`);
        });
      } catch (error) {
        this.set('error', error.message);
        Ember.Logger.error(`Form validation error: ${error.message}`);
      }
    }
  }
});

// Define the LoanApplication model
export default DS.Model.extend({
  // Attributes of the loan application
  loanAmount: DS.attr('number'),
  loanTerm: DS.attr('number'),
  creditScore: DS.attr('number'),
  income: DS.attr('number'),
  status: DS.attr('string')
});
